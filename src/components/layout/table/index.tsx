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
}

export default function TableLayout<T extends { id: string }>({
    columns,
    data,
    renderActions,
    actionsHeader = '',
    onRowClick,
}: TableLayoutProps<T>) {
    return (
        <>
            {/* 데스크톱 테이블 */}
            <S.TableContainer>
                <S.Table>
                    <S.TableHead>
                        <S.TableRow>
                            <S.TableCell colSpan={columns.length + (renderActions ? 1 : 0)} style={{ textAlign: 'center', height: '300px', color: '#aaa', fontSize: '1.2rem' }}>
                                데이터가 없습니다
                            </S.TableCell>
                        </S.TableRow>
                    </S.TableHead>
                    <tbody>
                        {data.length === 0 ? (
                            <S.TableRow>
                                <S.TableCell colSpan={columns.length + (renderActions ? 1 : 0)} style={{ textAlign: 'center', height: '300px', color: '#aaa', fontSize: '1.2rem' }}>
                                    데이터가 없습니다
                                </S.TableCell>
                            </S.TableRow>
                        ) : (
                            data.map((row) => (
                                <S.TableRow 
                                    key={row.id}
                                    onClick={() => onRowClick?.(row)}
                                    $clickable={!!onRowClick}
                                    className="table-row-hover"
                                >
                                    {columns.map((column) => (
                                        <S.TableCell key={`${row.id}-${column.key}`}>
                                            {column.render
                                                ? column.render(row)
                                                : String(row[column.key as keyof T] ?? '')}
                                        </S.TableCell>
                                    ))}
                                    {renderActions && (
                                        <S.TableCell>{renderActions(row)}</S.TableCell>
                                    )}
                                </S.TableRow>
                            ))
                        )}
                    </tbody>
                </S.Table>
            </S.TableContainer>

            {/* 모바일 카드 */}
            <S.MobileCardContainer>
                {data.length === 0 ? (
                    <S.EmptyMessage>데이터가 없습니다</S.EmptyMessage>
                ) : (
                    data.map((row) => (
                        <S.MobileCard 
                            key={row.id}
                            onClick={() => onRowClick?.(row)}
                            $clickable={!!onRowClick}
                        >
                            {columns.map((column) => (
                                <S.MobileCardRow key={`${row.id}-${column.key}`}>
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
                    ))
                )}
            </S.MobileCardContainer>
        </>
    );
}
