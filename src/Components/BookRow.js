import Delete from '../Components/Delete';
import Prestamo from './Prestamo';

const BookRow = (props) =>{

    const {  book, index, setRefresh, refresh } = props;

    return (
            <tr>
                <td>{index+1}</td>
                <td>{book.name}</td>
                <td>{book.stock}</td>
                <td><Prestamo setRefresh={setRefresh}  refresh={refresh}  id={book.id}  /></td>
                <td><Delete setRefresh={setRefresh}  refresh={refresh}  id={book.id}  /></td> 
            
            </tr>
        ) 

}

export default BookRow;
