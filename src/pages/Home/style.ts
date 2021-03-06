import styled from "styled-components";

export const Container = styled.div`
  background:#33CC95;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;


  > img{
    margin: 0 auto;
    width: 40%;
  }

  @media (min-width: 1700px) {
    > img{
    margin: 0 auto;
    width: 35%;
  }
  }
`;

export const LogoWrapper = styled.div`
  img {
    height: 4.5rem;
  }

  @media (max-width: 500px) {
    img {
    height: 3rem;
    }
  }
  @media (max-width: 325px) {
    img {
    height: 2.5rem;
    }
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #666666;
    margin-bottom: 1rem;
  }

  > h4{
    font-size: 0.6rem;
  }
`;

export const ContainerSideBar = styled.div`
  min-width: 400px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
  }

  @media (max-width: 500px) {
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h4 {
    color: #808080;
    font-weight: bold;
    font-size: 13px;
    margin-top: 2rem;

    a{
      text-decoration:none;
    }

    span {
      color: #33CC95;
      cursor: pointer;
    }
  }
`;

export const StyledInput = styled.input`
  width: 80%;
  max-width: 350px;
  min-width: 250px;
  height: 40px;
  border: transparent;
  outline: none;
  margin: 0.5rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const ContainerInput = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  
  p{
    align-self: flex-start;
    margin: 0;
    padding: 0;
    transform: translatey(30%);
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
  }
  
  > div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    p{
      transform: translatey(57%);
    }

    button{
      background-color: transparent;
      border: none;
      color: #33CC95;
      align-self: flex-end;
      cursor: pointer;
      padding: 0.8rem 0.3rem 0;
      font-size: 0.72rem;
    }
  }

  > button {
    width: 75%;
    max-width: 200px;
    min-width: 100px;
    height: 40px;
    border: none;
    margin: 1rem auto;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #33CC95;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
  }

`;
