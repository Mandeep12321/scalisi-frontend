"use client";
import { RECORDS_LIMIT } from "@/developmentContent/constants";
import { mergeClass } from "../../../resources/utils/helper";
import { Input } from "../../atoms/Input/Input";
import TableSkeleton from "../../atoms/TableSkeleton";
import NoData from "../../molecules/NoData/NoData";
import classes from "./Table.module.css";
export default function Table({
  headings,
  tableData,
  loading = false,
  id,
  tableHead,
  custTableClass,
  tableBodyClass,
  tableHeaderDiv,
  isModal = false,
  noteIndex,
  addNote,
  setAddNote,
}) {
  return (
    <>
      <style>
        {`
          .table100-body {
            overflow: scroll !important;
          }

         
         
          @media screen and (max-width: 1440px) {
           
            .table100.ver1 {
              overflow-x: scroll !important;
            }
          }
        `}
      </style>

      <div
        className={mergeClass(
          "table100 ver1 m-b-110",
          classes.rootHeaderStyle,
          tableHeaderDiv
        )}
      >
        <div
          className={mergeClass(
            classes.tableHeader,
            tableHead,
            "table100-head"
          )}
        >
          <table className={classes.table}>
            <thead className={mergeClass(classes.tableHeaderStyle)}>
              <tr className={mergeClass(classes.border_radius)}>
                {headings?.map((item, index) => (
                  <th
                    key={`${item?.label}${index}`}
                    className={mergeClass(
                      "fs-20",
                      classes.headings,
                      item?.className
                    )}
                    style={{
                      textAlign: "start",
                      ...(item?.style ?? {}),
                    }}
                  >
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        {loading ? (
          <TableSkeleton rowsCount={RECORDS_LIMIT} colsCount={4} />
        ) : (
          <div
            className={mergeClass(
              classes.tableBody,
              tableBodyClass,
              `table100-body`
            )}
          >
            <table
              className={mergeClass(classes.customTableCss, custTableClass)}
            >
              <tbody>
                {tableData?.length > 0 ? (
                  tableData?.map((item, index) => (
                    <div
                      key={index}
                      className={mergeClass(
                        index === tableData.length - 1
                          ? ""
                          : classes.borderBottom
                      )}
                    >
                      <tr
                        className={mergeClass(classes.border_radius)}
                        key={index}
                      >
                        {headings?.map((a) => (
                          <td
                            className={""}
                            key={a?.id + "" + index}
                            style={{
                              textAlign: "start",
                              ...(a?.style ?? {}),
                            }}
                          >
                            <div style={{ ...(a?.bodyStyle ?? {}) }}>
                              {a?.renderValue
                                ? a?.renderValue(item, index)
                                : item?.[a?.id]}
                            </div>
                          </td>
                        ))}
                      </tr>
                      {(item?.note || noteIndex === index) && (
                        <div
                          style={{
                            paddingBottom: "10px",
                          }}
                        >
                          <Input
                            type="text"
                            inputClass={classes.inputClass}
                            placeholder={"Add a Note"}
                            value={
                              noteIndex == index ? addNote : item?.note || ""
                            }
                            setValue={setAddNote}
                            disabled={noteIndex !== index}
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className={classes.noData}>
                    <NoData />
                  </div>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
