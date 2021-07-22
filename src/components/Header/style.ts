import styled from "styled-components"

export const Container = styled.header`
background: #2db584;
`;

export const Content = styled.div`
max-width:1220px;
margin: 0 auto;

padding: 2rem 1rem 12rem;
display: flex;
align-items:center;
justify-content: space-between;

div{
  display: flex;
  gap: 1rem;
}

button{
  font-size:1rem;
  color: #fff;
  background-color:#33CC95;
  border: 0;
  padding:0 2rem;
  border-radius: 0.25rem;
  height:3rem;
  
  transition:  background-color 0.1s ;
  
  &:hover{
    background-color:#28A478;
  }
}
`
