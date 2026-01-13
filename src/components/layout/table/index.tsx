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
                    {data.map((row) => (
                        <S.TableRow 
                            key={row.id}
                            onClick={() => onRowClick?.(row)}
                            $clickable={!!onRowClick}
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
                    ))}
                </tbody>
            </S.Table>
        </S.TableContainer>
    );
}
