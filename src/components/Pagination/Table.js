import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";

export default ({ partners }) => {
  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "email", title: "Email" },
    { name: "description", title: "Description" },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [pageSizes] = useState(12);

  return (
    <Paper>
      <Grid rows={partners} columns={columns}>
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <IntegratedPaging />

        <Table />
        <TableHeaderRow />
        <PagingPanel pageSizes={pageSize} />
      </Grid>
    </Paper>
  );
};
