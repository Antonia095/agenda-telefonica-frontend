import styled from 'styled-components';

export const ContactsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  margin: 1rem 0;
  padding: 0.2rem 0;
  height: 100%;
  width: 100%;
`;

export const ContactContainer = styled.div`
  margin: 0 0.5rem;
  color: white;
  font-size: 1.3rem;
  border-radius: 0.6rem;
  background-color: var(--contact-background);
  box-shadow: 0px 0px 3px 1px var(--box-shadow);

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const TitleBox = styled.div`
  padding: 0.3rem;
  font-size: 1.3rem;
  font-weight: 400;
  font-family: Poppins, sans-serif;
  color: white;
  border-radius: 0.6rem 0.6rem 0 0;
  background-color: #1976d2 
`;

export const ContactText = styled.p`
  margin: 0.8rem 0;
  padding: 0.3rem 0.5rem;
  color: black;
  font-size: 1.2rem;
  font-weight: 300;
  text-align: left;
  color: black; 
`;

export const IconsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0 0 0.6rem 0.6rem;
  background-color: #1976d2
`;

export const IconDiv = styled.div.attrs((props) => ({
  type: 'text',
  color: props.color,
  borderRadius: props.borderRadius,
}))`
  padding: 0.4rem 0;
  width: 100%;
  border-radius: ${(props) => props.borderRadius};
  transition: 0.5s ease-out;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.color};
  }
`;

export const Icon = styled.i`
  margin: 0rem 0.2rem;
  color: white;
`;
