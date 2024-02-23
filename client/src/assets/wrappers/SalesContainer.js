import styled from 'styled-components'

const Wrapper = styled.section`
  margin-top: 1rem;
  
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    // display: grid;
    // grid-template-columns: 1fr;
    // row-gap: 2rem;
    background: var(--white); 
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    // border-bottom: 1px solid var(--grey-100);
    width: 100%;
    text-align: center;
    text-transform: capitalize;
  }

  .header{
    font-size: 1.2rem;
    background: var(--white);
  border-radius: var(--border-radius);
    border-bottom: 3px solid var(--grey-300);
    box-shadow: var(--shadow-2);
  }

  th{
    padding: 0.5rem 0.5rem;
  }
  td{
    font-size: 1.1rem;
    padding: 0.7rem 0.5rem;
  }

`
export default Wrapper






// Wrapper component styling
// import styled from 'styled-components';

// const Wrapper = styled.div`
//   display: grid;
//   grid-template-columns: auto;
//   grid-gap: 10px;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
  
//   .table {
//     display: grid;
//     grid-template-columns: auto 1fr auto auto;
//     align-items: center;
//     grid-gap: 10px;
//     padding: 10px;
//     background-color: #f9f9f9;
//     border-radius: 5px;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
//     h5, p {
//       margin: 0;
//     }

//     .info {
//       display: flex;
//       flex-direction: column;
//     }

//     .mid {
//       display: flex;
//       align-items: center;
//     }

//     .status {
//       padding: 5px 10px;
//       border-radius: 20px;
//       font-size: 14px;
//     }

//     .status.available {
//       background-color: #6fcf97;
//       color: #fff;
//     }

//     .status.low {
//       background-color: #f2c94c;
//       color: #fff;
//     }

//     .status.empty {
//       background-color: #eb5757;
//       color: #fff;
//     }

//     .status.pri {
//       font-weight: bold;
//     }

//     .actions {
//       display: flex;
//       justify-content: space-between;
//       margin-top: 10px;
//     }

//     .btn {
//       padding: 8px 15px;
//       border-radius: 5px;
//       text-decoration: none;
//       cursor: pointer;
//     }

//     .edit-btn {
//       background-color: #3498db;
//       color: #fff;
//     }

//     .delete-btn {
//       background-color: #e74c3c;
//       color: #fff;
//     }

//     .btn:hover {
//       opacity: 0.8;
//     }
//   }
// `;

// export default Wrapper;
