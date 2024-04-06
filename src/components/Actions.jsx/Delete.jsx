// import React, { useContext } from 'react'
// import { Button } from 'react-bootstrap'
// import { Myeventcrud } from '../../App';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// function Delete() {
//     const [data, setData] = useContext(Myeventcrud);
//   const nav = useNavigate();

//   const { id } = useParams();

//   async function deletedata() {
//     try {
//       await axios.delete(`http://localhost:5000/deletecrud/${id}`);
//       const updatedData = data.filter((item) => item._id !== id);
//       setData(updatedData);
//       nav('/Bookplans');
//     } catch (error) {
//       console.error('Error deleting data:', error);
//     }
//   }
//   return (
//     <div className='delete-container'>
//         <div className='deletebox'>
//             <div className="up">
//                 <h1>Are you sure you want to delete?</h1>
//             </div>
//             <div className="down">
//                 <button className="btn1" onClick={() => nav(-1)}> Cancel</button>
//                 <button className="btn1" onClick={deletedata}> Delete</button>
//             </div>
     
//          </div>
//     </div>
//   )
// }

// export default Delete