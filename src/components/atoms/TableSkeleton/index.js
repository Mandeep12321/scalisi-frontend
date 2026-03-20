import { Skeleton } from "@mui/material";
import React from "react";
import classes from "./TableSkeleton.module.css";

function TableSkeleton({ rowsCount = 10, colsCount = 5 }) {
  const rows = Array(rowsCount).fill(0);
  const cols = Array(colsCount).fill(0);

  return (
    <>
      <style>{`
           .tr{
                all:unset;
                display:flex;
            }
            .table100{
               margin:10px
            }
            `}</style>
      <div class={`table100 ver1 m-b-110 ${classes.tableSkeleton}`}>
        <div class=" js-pscroll ps ps--active-y">
          <table>
            <tbody>
              {rows.map((item, index) => (
                <tr class="row100 body tr">
                  {cols?.map((item) => (
                    <td
                      style={{
                        width: `${100 / colsCount}%`,
                        paddingBlock: "0px",
                      }}
                    >
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TableSkeleton;
