import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Input from '@material-ui/core/Input';

const CaseRow = ({val, handleChangeSingular, handleChangePlural, hasErrorsSingular, hasErrorsPlural}) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {val}
      </TableCell>
      <TableCell align="right" className={hasErrorsSingular}>
        <Input onChange={(event) => handleChangeSingular(event)}>
        </Input>
      </TableCell>
      <TableCell align="right" className={hasErrorsPlural}>
        <Input onChange={(event) => handleChangePlural(event)}>
        </Input>
      </TableCell>
    </TableRow>     
  )
}

export default CaseRow;