import styled from 'styled-components'

const Wrapper = styled.tr`
// display: grid;
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-1);
  border-bottom: 1px solid var(--grey-100);

  .info{
    width: 15%;
  }

  .pri {
    // background: var(--grey-100);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }

  .pri svg{
    font-size: 1rem;
  }

  .del-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    color: var(--red-dark);
    cursor: pointer;
  }

  .content{
    width: 20%;
  }

  .actions{
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 2rem;
    padding-top: 0.7rem;
    width: 140px;
  }

  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }

  .delete-btn {
    background: #e0e8f9;
    color: #647acb;
  }
`

export default Wrapper







// import styled from 'styled-components';

// const Wrapper = styled.article`
//   background: var(--white);
//   border-radius: var(--border-radius);
//   box-shadow: var(--shadow-2);
//   border-bottom: 1px solid var(--grey-100);

//   .table {
//     display: grid;
//     grid-template-columns: repeat(6, 1fr);
//     padding: 1rem 1.5rem;
//   }

//   .mid {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 2rem;
//   }

  // .pri {
  //   background: var(--grey-100);
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   gap: 0.3rem;
  // }

//   .status {
//     border-radius: var(--borderRadius);
//     text-transform: capitalize;
//     letter-spacing: var(--letterSpacing);
//     text-align: center;
//     width: 100px;
//     height: 30px;
//   }

//   footer {
//     margin: 0.5rem 1rem;
//     display: flex;
//     justify-content: space-between;
//   }

//   .actions {
//     display: flex;
//   }

//   .edit-btn,
//   .delete-btn {
//     letter-spacing: var(--letterSpacing);
//     cursor: pointer;
//     height: 40px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 0.5rem 2rem;
//     padding-top: 0.7rem;
//     width: 160px;
//   }

  // .edit-btn {
  //   color: var(--green-dark);
  //   background: var(--green-light);
  //   margin-right: 0.5rem;
  // }

  // .delete-btn {
  //   background: #e0e8f9;
  //   color: #647acb;
  // }
// `;

// export default Wrapper;