import { type ReactNode } from 'react';
import * as S from './style';

export interface TableColumn<T> {
    key: string;
    header: string | ReactNode;
    width?: string;
    render?: (row: T) => ReactNode;
}

interface TableLayoutProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    renderActions?: (row: T) => ReactNode;
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
                <S.TableBody>
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
                                        : (row as any)[column.key]}
                                </S.TableCell>
                            ))}
                            {renderActions && (
                                <S.TableCell>{renderActions(row)}</S.TableCell>
                            )}
                        </S.TableRow>
                    ))}
                </S.TableBody>
            </S.Table>
        </S.TableContainer>
    );
}
