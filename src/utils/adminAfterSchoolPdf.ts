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

export const createAdminAfterSchoolPrintHtml = ({
  grade,
  branch,
  schedule,
}: {
  grade: number;
  branch: number;
  schedule: PdfScheduleCell[];
}): string => {
  const dayOrder: PdfWeekDay[] = ['MON', 'TUE', 'WED', 'THU'];
  const sorted = [...schedule].sort((a, b) => {
    const dayDiff = dayOrder.indexOf(a.weekDay) - dayOrder.indexOf(b.weekDay);
    if (dayDiff !== 0) return dayDiff;
    return a.slot.startPeriod - b.slot.startPeriod;
  });

  const columnsByCell = sorted.map((cell) => getColumns(cell.items));
  const maxStudentRows = Math.max(
    1,
    ...columnsByCell.flatMap((cells) => cells.map((item) => item.students.length))
  );

  const headerRow = sorted.map((cell, idx) => {
    const colspan = columnsByCell[idx].length;
    return `<th class="slot-header" colspan="${colspan}">${DAY_LABEL[cell.weekDay]} ${SLOT_LABEL[cell.slot.startPeriod]}</th>`;
  }).join('');

  const teacherRow = columnsByCell.map((cells) =>
    cells.map((item) => `<td>${escapeHtml(item.teacher.name || '-')}</td>`).join('')
  ).join('');

  const subjectRow = columnsByCell.map((cells) =>
    cells.map((item) => `<td>${escapeHtml(item.name || '-')}</td>`).join('')
  ).join('');

  const placeRow = columnsByCell.map((cells) =>
    cells.map((item) => `<td>${escapeHtml(item.place.name || '-')}</td>`).join('')
  ).join('');

  const studentRows = Array.from({ length: maxStudentRows }, (_, rowIndex) => {
    const row = columnsByCell.map((cells) =>
      cells.map((item) => {
        const student = item.students[rowIndex];
        if (!student) return '<td></td>';
        return `<td>${escapeHtml(`${student.number} ${student.name}`)}</td>`;
      }).join('')
    ).join('');
    return `<tr><th class="row-number">${rowIndex + 1}</th>${row}</tr>`;
  }).join('');

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>방과후 시간표 ${grade}학년 ${branch}분기</title>
  <style>
    @page { size: A4 landscape; margin: 8mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
      color: #111;
    }
    .page-root {
      position: relative;
      width: 100%;
      padding-bottom: 22px;
    }
    .title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .title {
      font-size: 15px;
      font-weight: 700;
      color: #1d3557;
    }
    .subtitle {
      font-size: 12px;
      color: #4a5d75;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      font-size: 11px;
      border: 1px solid #a8b7cf;
      background: #fff;
    }
    th, td {
      border: 1px solid #9ca9bf;
      padding: 4px 3px;
      text-align: center;
      vertical-align: middle;
      white-space: normal;
      word-break: break-word;
      overflow-wrap: anywhere;
    }
    .slot-header {
      background: #edf3fb;
      font-weight: 700;
      color: #23395d;
    }
    .empty-head { width: 34px; background: #edf3fb; }
    .label-cell { width: 34px; background: #f2f6fc; font-weight: 700; color: #29456b; }
    .row-number { width: 34px; background: #f8faff; color: #51637f; font-weight: 500; }
    .brand-logo {
      position: fixed;
      left: 50%;
      bottom: 5mm;
      transform: translateX(-50%);
      opacity: 0.9;
    }
    .brand-logo img {
      height: 14px;
      width: auto;
    }
    @media print {
      .print-guide { display: none; }
    }
  </style>
</head>
<body>
  <div id="page-root" class="page-root">
    <div class="title-wrap">
      <div>
        <div class="title">${grade}학년 ${branch}분기 방과후 시간표</div>
        <div class="subtitle">월요일~목요일 / 8-9교시, 10-11교시</div>
      </div>
      <div class="print-guide">인쇄 창에서 PDF로 저장을 선택하세요.</div>
    </div>
    <table>
      <tr>
        <th class="empty-head"></th>
        ${headerRow}
      </tr>
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
    </table>
    <div class="brand-logo">
      <img src="/assets/logo.svg" alt="TeachMon" />
    </div>
  </div>
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
