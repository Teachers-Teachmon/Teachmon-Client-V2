import type { AfterSchoolResponse } from '@/types/after-school';

export type PdfWeekDay = 'MON' | 'TUE' | 'WED' | 'THU';
export type PdfSlot = { startPeriod: 8 | 10; endPeriod: 9 | 11 };

export interface PdfScheduleCell {
  weekDay: PdfWeekDay;
  slot: PdfSlot;
  items: AfterSchoolResponse[];
}

const DAY_LABEL: Record<PdfWeekDay, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
};

const SLOT_LABEL: Record<8 | 10, string> = {
  8: '8-9교시',
  10: '10-11교시',
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getColumns = (items: AfterSchoolResponse[]): AfterSchoolResponse[] =>
  items.length > 0
    ? items
    : [
      {
        id: -1,
        week_day: '',
        period: '',
        name: '',
        teacher: { id: -1, name: '' },
        place: { id: -1, name: '' },
        students: [],
      },
    ];

const buildScheduleTableHtml = (cells: PdfScheduleCell[]): string => {
  const sorted = [...cells].sort((a, b) => {
    const dayOrder: PdfWeekDay[] = ['MON', 'TUE', 'WED', 'THU'];
    const dayDiff = dayOrder.indexOf(a.weekDay) - dayOrder.indexOf(b.weekDay);
    if (dayDiff !== 0) return dayDiff;
    return a.slot.startPeriod - b.slot.startPeriod;
  });

  const columnsByCell = sorted.map((cell) => getColumns(cell.items));
  const totalDataColumns = columnsByCell.reduce((sum, items) => sum + items.length, 0);
  const maxStudentRows = Math.max(
    1,
    ...columnsByCell.flatMap((items) => items.map((item) => item.students.length))
  );
  const tableDensityClass =
    maxStudentRows >= 16 || totalDataColumns >= 14
      ? 'dense'
      : maxStudentRows >= 12 || totalDataColumns >= 10
        ? 'compact'
        : 'relaxed';

  const headerRow = sorted.map((cell, idx) => {
    const colspan = columnsByCell[idx].length;
    return `<th class="slot-header" colspan="${colspan}">${DAY_LABEL[cell.weekDay]} ${SLOT_LABEL[cell.slot.startPeriod]}</th>`;
  }).join('');

  const teacherRow = columnsByCell.map((items) =>
    items.map((item) => `<td>${escapeHtml(item.teacher.name || '-')}</td>`).join('')
  ).join('');

  const subjectRow = columnsByCell.map((items) =>
    items.map((item) => `<td>${escapeHtml(item.name || '-')}</td>`).join('')
  ).join('');

  const placeRow = columnsByCell.map((items) =>
    items.map((item) => `<td>${escapeHtml(item.place.name || '-')}</td>`).join('')
  ).join('');

  const studentRows = Array.from({ length: maxStudentRows }, (_, rowIndex) => {
    const row = columnsByCell.map((items) =>
      items.map((item) => {
        const student = item.students[rowIndex];
        if (!student) return '<td></td>';
        return `<td>${escapeHtml(`${student.number} ${student.name}`)}</td>`;
      }).join('')
    ).join('');
    return `<tr><th class="row-number">${rowIndex + 1}</th>${row}</tr>`;
  }).join('');

  return `
    <div class="table-wrap">
      <table class="${tableDensityClass}">
        <thead>
          <tr>
            <th class="empty-head"></th>
            ${headerRow}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="label-cell">강사</th>
            ${teacherRow}
          </tr>
          <tr>
            <th class="label-cell">과목명</th>
            ${subjectRow}
          </tr>
          <tr>
            <th class="label-cell">장소</th>
            ${placeRow}
          </tr>
          ${studentRows}
        </tbody>
      </table>
    </div>
  `;
};

export const createAdminAfterSchoolPrintHtml = ({
  grade,
  branch,
  schedule,
}: {
  grade: number;
  branch: number;
  schedule: PdfScheduleCell[];
}): string => {
  const hasAnyItems = schedule.some((cell) => cell.items.length > 0);

  if (!hasAnyItems) {
    return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>방과후 시간표 ${grade}학년 ${branch}분기</title>
  <style>
    @page { size: A4 landscape; margin: 12mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
      color: #111;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page-root { width: 100%; }
    .title {
      font-size: 18px;
      font-weight: 700;
      color: #1d3557;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 13px;
      color: #4a5d75;
      margin-bottom: 24px;
    }
    .empty {
      border: 1px solid #c9d4e5;
      border-radius: 8px;
      background: #f8fbff;
      padding: 28px;
      text-align: center;
      font-size: 14px;
      color: #2f4668;
    }
  </style>
</head>
<body>
  <div class="page-root">
    <div class="title">${grade}학년 ${branch}분기 방과후 시간표</div>
    <div class="subtitle">월요일~목요일 / 8-9교시, 10-11교시</div>
    <div class="empty">해당 분기에는 방과후 데이터가 없습니다.</div>
  </div>
</body>
</html>`;
  }

  const pageConfigs: Array<{ days: PdfWeekDay[]; subtitle: string }> = [
    { days: ['MON'], subtitle: '월요일 / 8-9교시, 10-11교시' },
    { days: ['TUE'], subtitle: '화요일 / 8-9교시, 10-11교시' },
    { days: ['WED'], subtitle: '수요일 / 8-9교시, 10-11교시' },
    { days: ['THU'], subtitle: '목요일 / 8-9교시, 10-11교시' },
  ];

  const pageSections = pageConfigs
    .map((config) => {
      const groupCells = schedule.filter((cell) => config.days.includes(cell.weekDay));
      const activeDays = new Set(
        groupCells
          .filter((cell) => cell.items.length > 0)
          .map((cell) => cell.weekDay)
      );
      const filtered = groupCells.filter((cell) => activeDays.has(cell.weekDay));
      if (filtered.length === 0) return '';

      return `
      <section class="print-page">
        <div class="page-root">
          <div class="title-wrap">
            <div>
              <div class="title">${grade}학년 ${branch}분기 방과후 시간표</div>
              <div class="subtitle">${config.subtitle}</div>
            </div>
            <div class="print-guide">인쇄 창에서 PDF로 저장을 선택하세요.</div>
          </div>
          ${buildScheduleTableHtml(filtered)}
          <div class="brand-logo">
            <img src="/assets/logo.svg" alt="TeachMon" />
          </div>
        </div>
      </section>
      `;
    })
    .filter(Boolean)
    .join('');

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>방과후 시간표 ${grade}학년 ${branch}분기</title>
  <style>
    @page { size: A4 landscape; margin: 6mm; }
    html, body { height: 100%; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
      color: #111;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .print-page {
      min-height: calc(100vh - 12mm);
      page-break-after: always;
    }
    .print-page:last-child {
      page-break-after: auto;
    }
    .page-root {
      width: 100%;
      min-height: calc(100vh - 12mm);
      display: flex;
      flex-direction: column;
    }
    .title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .title {
      font-size: 18px;
      font-weight: 700;
      color: #1d3557;
    }
    .subtitle {
      font-size: 13px;
      color: #4a5d75;
    }
    .table-wrap {
      flex: 1;
      min-height: 0;
      display: flex;
    }
    table {
      width: 100%;
      height: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      font-size: 12px;
      line-height: 1.25;
      border: 1px solid #a8b7cf;
      background: #fff;
    }
    table.relaxed {
      font-size: 13.5px;
      line-height: 1.3;
    }
    table.compact {
      font-size: 12px;
      line-height: 1.2;
    }
    table.dense {
      font-size: 10.5px;
      line-height: 1.15;
    }
    th, td {
      border: 1px solid #9ca9bf;
      padding: 4px 3px;
      text-align: center;
      vertical-align: middle;
      white-space: normal;
      word-break: break-word;
      overflow-wrap: anywhere;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    table.compact th, table.compact td {
      padding: 3px 2px;
    }
    table.dense th, table.dense td {
      padding: 2px 1px;
    }
    tr { break-inside: avoid; page-break-inside: avoid; }
    .slot-header {
      background: #edf3fb;
      font-weight: 700;
      color: #23395d;
    }
    .empty-head { width: 42px; background: #edf3fb; }
    .label-cell { width: 42px; background: #f2f6fc; font-weight: 700; color: #29456b; }
    .row-number { width: 42px; background: #f8faff; color: #51637f; font-weight: 500; }
    .brand-logo {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.95;
    }
    .brand-logo img {
      height: 20px;
      width: auto;
    }
    @media print {
      .print-guide { display: none; }
    }
  </style>
</head>
<body>
  ${pageSections}
</body>
</html>`;
};

export const openAdminAfterSchoolLoadingWindow = (): Window | null => {
  const printWindow = window.open('about:blank', '_blank', 'width=1600,height=900');
  if (!printWindow) return null;

  printWindow.document.open();
  printWindow.document.write(`<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>PDF 생성 중</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
      color: #333;
    }
  </style>
</head>
<body>PDF 생성 중입니다. 잠시만 기다려주세요...</body>
</html>`);
  printWindow.document.close();

  return printWindow;
};

export const renderAdminAfterSchoolPrintWindow = (printWindow: Window, html: string): void => {
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.onload = () => {
    printWindow.print();
  };
};
