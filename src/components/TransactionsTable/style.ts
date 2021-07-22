import styled from "styled-components"

export const Container = styled.div`
margin: 3rem 4rem;

.styleScreen{
  display:none;
}

table{
  width:100%;
  border-spacing: 0 0.5rem;

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

@media screen and (max-width:525px){
  margin: 0 auto;
  padding: 1rem;
    
      table{
        tr{
          display: none;
        }
      }

      .styleScreen{
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;

        margin-top: 1rem;
        padding: 1rem 0;

 

        .contentTransactions{
          width: 100%;
          background:var(--shape);
          padding:1rem 2rem;
          border-radius:0.25rem;
          
          
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content:space-between;
          gap: 0.5rem;

        div{
          &.deposit{ color: var(--green)}
          &.withdraw{color: var(--red) }
        }

        .styleTitle{
          color: #363F5F;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .stylePrice{
          width: 100%;
        }

        .styleCategory, .styleCreatedAt{
          color:#969CB2;
          padding-top: 1rem;
        }

        .action{
          display:flex;
          gap: 0.3rem;
          align-items: center;
          transform:translateX(20%);

        button{
            background: transparent;
            border: none;
            transform:translateY(8%);
          
           img{
             width: 22px;
             height: 22px;
           }
          
          &:hover{
            filter:brightness(0.9);
          }
        }
      }  
    }
  }
}

@media screen and (max-width:325px){
       .action{
          display:flex;
          gap: 0.1rem;
          align-items: center;
          transform:translateX(20%);
          
          button{
            background: transparent;
            border: none;
            transform:translateY(8%);
          
           img{
             width: 18px;
             height: 18px;
           }

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
export const ContainerInformation = styled.div`
  display: flex;
  align-items:center;
  justify-content:space-between;

  div{
    display: flex;
    gap: 0.5rem;
    
    & > button{
      background-color:transparent;
      border: none;
      text-decoration: underline;
      color: var(--text-body);
      padding-right: 0.6rem;
      &:hover{
        filter: brightness(0.9)
      }
    }
    
    > h3{
      font-weight: 500;
      color:#969CB2;
    }
  }
  
 > h3{
    font-weight: 500;
    color:#363F5F;
    font-size: 1.4rem;
  }

`
