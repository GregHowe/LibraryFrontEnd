import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Table from 'react-bootstrap/Table';
import BookRow from '../Components/BookRow';

const List = props => {
  const rows = [];
  let { books, setRefresh, refresh } = props  

  if (books.length){
      books.forEach((book, i) => {
        rows.push(<BookRow book={book} key={i} index={i}    setRefresh = {setRefresh} refresh={refresh}  />);
      });
  }
  else {
    rows.push(<tr key={0} ><td colspan="5"  key={0}  style={{textAlign: "center"}} >There is no books</td></tr>)
  }

  return (
    <>
    <div style={{minHeight: "30px"}} ></div>
        <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Libro</th>
                <th>Stock</th>
                <th>Prestar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
      </Table>
    </>
  );
}

export default List;
