import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./Transactions.css";

class Transactions extends React.Component{

    state={
        rows:'',
    }

    componentDidMount(){
        console.log(this.props.transactions);
        const createData=(transactionDate, transactionID, transactionType, transactionAmount)=> {
            return { transactionDate, transactionID, transactionType, transactionAmount };
          }
        const rows= this.props.transactions.map(
            transaction=>{
               return createData(transaction.dateOfTransfer,transaction.idtransaction,transaction.type,transaction.amount)
            }
          )
        console.log(rows)
        this.setState({
            rows: rows
        })
    }
    render(){
        return(
            this.state.rows!==''?
            (
                <TableContainer component={Paper} className="transactions__table">
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Transaction Date</TableCell>
                      <TableCell align="right">Transaction ID</TableCell>
                      <TableCell align="right">Transaction Type</TableCell>
                      <TableCell align="right">Transaction Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.rows.map((row) => (
                      <TableRow key={row.transactionDate}>
                        <TableCell component="th" scope="row">
                          {row.transactionDate}
                        </TableCell>
                        <TableCell align="right">{row.transactionID}</TableCell>
                        <TableCell align="right">{row.transactionType}</TableCell>
                        <TableCell align="right">{row.transactionAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ):null
        );
    }

};

export default Transactions;
