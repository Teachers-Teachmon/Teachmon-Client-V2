import * as S from './style';

export interface TableColumn<T> {
    key: string;
    header: string | React.ReactNode;
    width?: string;
    render?: (row: T) => React.ReactNode;
}

interface TableLayoutProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    renderActions?: (row: T) => React.ReactNode;
    actionsHeader?: string;
    onRowClick?: (row: T) => void;
    isLoading?: boolean;
    getRowId?: (row: T, index: number) => string;
}

export default function TableLayout<T>({
    columns,
    data,
    renderActions,
    actionsHeader = '',
    onRowClick,
    isLoading = false,
    getRowId = (_, index) => String(index),
}: TableLayoutProps<T>) {
    return (
        <>
            {/* 데스크톱 테이블 */}
            <S.TableContainer>
                <S.Table>
                    <S.TableHead>
                        <S.TableRow>
                            {columns.map((column) => (
                                <S.TableHeader
                                    key={column.key}
                                    style={{ width: column.width }}
                                >
                                    {column.header}
                                </S.TableHeader>
                            ))}
                            {renderActions && <S.TableHeader>{actionsHeader}</S.TableHeader>}
                        </S.TableRow>
                    </S.TableHead>
                    <tbody>
                        {isLoading ? (
                            <S.TableRow>
                                <S.TableCell colSpan={columns.length + (renderActions ? 1 : 0)} style={{ textAlign: 'center', height: '300px', color: '#aaa', fontSize: '1.2rem' }}>
                                    로딩 중...
                                </S.TableCell>
                            </S.TableRow>
                        ) : data.length === 0 ? (
                            <S.TableRow>
                                <S.TableCell colSpan={columns.length + (renderActions ? 1 : 0)} style={{ textAlign: 'center', height: '300px', color: '#aaa', fontSize: '1.2rem' }}>
                                    데이터가 없습니다
                                </S.TableCell>
                            </S.TableRow>
                        ) : (
                            data.map((row, index) => {
                                const rowId = getRowId(row, index);
                                return (
                                    <S.TableRow 
                                        key={rowId}
                                        onClick={() => onRowClick?.(row)}
                                        $clickable={!!onRowClick}
                                        className="table-row-hover"
                                    >
                                        {columns.map((column) => (
                                            <S.TableCell key={`${rowId}-${column.key}`}>
                                                {column.render
                                                    ? column.render(row)
                                                    : String(row[column.key as keyof T] ?? '')}
                                            </S.TableCell>
                                        ))}
                                        {renderActions && (
                                            <S.TableCell>{renderActions(row)}</S.TableCell>
                                        )}
                                    </S.TableRow>
                                );
                            })
                        )}
                    </tbody>
                </S.Table>
            </S.TableContainer>

            {/* 모바일 카드 */}
            <S.MobileCardContainer>
                {isLoading ? (
                    <S.EmptyMessage>로딩 중...</S.EmptyMessage>
                ) : data.length === 0 ? (
                    <S.EmptyMessage>데이터가 없습니다</S.EmptyMessage>
                ) : (
                    data.map((row, index) => {
                        const rowId = getRowId(row, index);
                        return (
                            <S.MobileCard 
                                key={rowId}
                                onClick={() => onRowClick?.(row)}
                                $clickable={!!onRowClick}
                            >
                                {columns.map((column) => (
                                    <S.MobileCardRow key={`${rowId}-${column.key}`}>
                                        <S.MobileCardLabel>
                                            {typeof column.header === 'string' ? column.header : column.key}
                                        </S.MobileCardLabel>
                                        <S.MobileCardValue>
                                            {column.render
                                                ? column.render(row)
                                                : String(row[column.key as keyof T] ?? '')}
                                        </S.MobileCardValue>
                                    </S.MobileCardRow>
                                ))}
                                {renderActions && (
                                    <S.MobileCardActions>
                                        {renderActions(row)}
                                    </S.MobileCardActions>
                                )}
                            </S.MobileCard>
                        );
                    })
                )}
            </S.MobileCardContainer>
        </>
    );
}
