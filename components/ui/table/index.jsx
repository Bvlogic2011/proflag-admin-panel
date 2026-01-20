import React from "react";
import { ColorRing, TailSpin } from "react-loader-spinner";
import { twMerge } from "tailwind-merge";

const Table = ({ children, className }) => (
  <div className="overflow-x-auto rounded-xl bg-white dark:bg-white/[0.03]">
    <table className={twMerge("min-w-full rounded-xl", className)}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, className }) => (
  <thead className={className}>{children}</thead>
);

const TableBody = ({ children, className, loading, isEmpty }) => {
  return (
    <tbody className={className}>
      {loading ? (
        <tr>
          <td colSpan={100}>
            <div className="px-5 py-4 flex justify-center">
              <TailSpin
                visible={true}
                width="40"
                height="40"
                colors={["#465fff", "#465fff"]}
                color="#465fff"
              />
            </div>
          </td>
        </tr>
      ) : isEmpty ? (
        <tr>
          <td colSpan={100}>
            <div className="px-5 py-4 flex justify-center">No Data Found</div>
          </td>
        </tr>
      ) : (
        children
      )}
    </tbody>
  );
};

const TableFooter = ({ children, className }) => {
  return <tfoot className={className}>{children}</tfoot>;
};
const TableRow = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);

const TableCell = ({ children, isHeader = false, className, colSpan }) => {
  const CellTag = isHeader ? "th" : "td";
  return (
    <CellTag
      className={twMerge(
        `px-5 py-2 text-start text-theme-xs border ${
          isHeader
            ? "font-semibold text-gray-700 dark:text-gray-200"
            : "font-medium text-gray-500 dark:text-gray-400"
        }`,
        className,
      )}
      colSpan={colSpan}
    >
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableCell };
