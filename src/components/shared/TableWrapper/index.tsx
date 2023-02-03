import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Collapse, Unstable_Grid2 as Grid } from "@mui/material";
import { useState } from "react";
import LoadingButton from "../LoadingButton";
import { TGenericObj } from "../../../globals/types";

interface IProps {
  columns: string[];
  rows: { [key: string]: any }[];
  actionColumn?: boolean;
  onClickDeleteButton?: (id: string) => void;
  actionColumnConfig?: { align: "left" | "right" | "center" };
  innerTableColumns?: string[];
}

const TableWrapper = ({
  columns,
  rows,
  actionColumn,
  onClickDeleteButton,
  innerTableColumns,
  actionColumnConfig = { align: "center" },
}: IProps) => {
  const [subCategoryData, setSubCategoryData] = useState<TGenericObj[]>([]);
  const [selectedSubCategoryDataId, setSelectedSubCategoryId] = useState("");
  const handleExpandButton = (data: TGenericObj[], id: string) => {
    setSubCategoryData(data);
    setSelectedSubCategoryId(id);
  };
  const resetExpandButton = () => {
    setSubCategoryData([]);
    setSelectedSubCategoryId("");
  };

  const isSubcategoryTableShowing = !!subCategoryData.length;

  return (
    <Grid container>
      <Grid xs={12}>
        <TableContainer sx={{ maxHeight: 700, width: "100%", flex: 1 }}>
          <Table
            sx={{ minWidth: 200, width: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col} sx={{ fontWeight: "bold" }}>
                    {col}
                  </TableCell>
                ))}
                {actionColumn && (
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    align={actionColumnConfig.align}
                  >
                    Action
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <>
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {columns.map((col) => (
                      <TableCell key={row[col]} align="left">
                        {!Array.isArray(row[col]) ? (
                          row[col]
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() =>
                              isSubcategoryTableShowing
                                ? resetExpandButton()
                                : handleExpandButton(row[col], row?.id)
                            }
                          >
                            {isSubcategoryTableShowing
                              ? "Click to hide"
                              : "Expand More"}
                          </Button>
                        )}
                      </TableCell>
                    ))}

                    {actionColumn && (
                      <TableCell align={actionColumnConfig.align}>
                        <LoadingButton
                          size="small"
                          text="Delete"
                          color="error"
                          onClick={() => onClickDeleteButton?.(row.id)}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                  <Collapse
                    in={
                      !!innerTableColumns &&
                      isSubcategoryTableShowing &&
                      row.id === selectedSubCategoryDataId
                    }
                    timeout="auto"
                    unmountOnExit
                  >
                    <TableWrapper
                      columns={innerTableColumns!}
                      rows={subCategoryData}
                    />
                  </Collapse>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default TableWrapper;
