import styled from "styled-components"

export const Container = styled.div`
margin: 4rem;

table{
  width:100%;
  border-spacing: 0 0.5rem;

  tr{
  }

  th{
    color: var(--text-body);
    font-weight: 400;
    padding: 1rem 2rem;
    text-align: left;
    line-height: 1.5rem;
  }

  td{
    padding:1rem 2rem;
    border: 0;
    background-color:var(--shape);
    color: var(--text-body);
    border-radius: 0.2rem;

    &:first-child{
      color: var(--text-title)
    }

    &.deposit{
      color: var(--green)
    }

    &.withdraw{
      color: var(--red)
    }

    
  }

  .action{
    display:flex;
    gap: 0.3rem;
    button{
      background: transparent;
      border: none;

      &:hover{
        filter:brightness(0.9);
      }
    }
   
  }
}
`

export const ContainerDeleteTrasaction = styled.div`
  margin: 1.5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

h2{
  font-size:2rem
}

button{
    height:3rem;
    border: 1px solid #d7d7d7;
    border-radius:0.25rem;
    margin: 1rem auto auto auto;

    width: 85%;

    transition: border-color 0.2s;

    span{
      display: inline-block;
      font-size:1rem;
    }
 }

 .delete{
      color: white;
      background-color:var(--red);
      transition: filter 0.2s;
    
      &:hover{
       filter: brightness(0.9)
      }

    }
 .cancel{
      color: white;
      background-color: var(--text-body);
      transition: filter 0.2s;

      &:hover{
       filter: brightness(0.9)
      }
    }

`
