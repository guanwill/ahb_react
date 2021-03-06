import styled from "styled-components";
import "./fonts.css";

export const ContainerInner = styled.div`
  margin: 30px 0;
  @media (max-width: 414px) {
    margin: 10px;
  }
`;

export const ButtonWrapper = styled.div`
  margin: 10px;
  button {
    box-shadow: none;
  }
  @media (max-width: 414px) {
    a {
      font-size: 10px;
    }
    button {
      font-size: 10px;
    }
  }
`;

export const LinkWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

export const SubHeadingWrapper = styled.div`
  h1 {
    font-size: 15px;
    font-family: "Press Start 2P";
    padding: 10px;
    color: #3a3a3a;
  }
`;

export const SubHeadingWrapper2 = styled.div`
  h1 {
    font-size: 15px;
    font-family: "Press Start 2P";
    padding: 30px 10px 10px 10px;
    color: #3a3a3a;
  }
`;

export const BackLinkWrapper = styled.div`
  width: 100%;
  text-align: left;
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
`;

export const PageTitle = styled.h2`
  margin: 20px 0 20px 0;
  font-size: 15px;
  padding: 10px;
  font-family: "Press Start 2P";
  color: #3a3a3a;
  font-weight: normal;
`;

export const AlignLeft = styled.div`
  text-align: left;
`;

export const AlignRight = styled.div`
  text-align: right;
`;

// INVENTORY
export const ShareLink = styled.div`
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
`;

// NAVBAR
// navbar also has its own component inline styles
export const NavBrandWrapper = styled.p`
  font-family: "Press Start 2P";
  text-align: left;
  font-size: 21px;
  @media (max-width: 768px) {
    text-align: center;
  }
  @media (max-width: 414px) {
    padding: 10px 0;
    margin-bottom: 5px;
  }
`;

export const NavBrandWrapperLinkWrapper = styled.div`
  a {
    text-decoration: none;
  }
  a:visited {
    color: #3f51b5;
  }
`;

export const NavButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  @media (max-width: 414px) {
    justify-content: center;
    button {
      font-size: 10px;
      width: 80px;
    }
    a {
      font-size: 10px;
      width: 80px;
    }
  }
`;

// FORMS
export const InputField = styled.input.attrs(props => ({
  type: props.type,
  placeholder: props.placeholder,
  className: props.className,
  name: props.name,
  onChange: props.onChange,
  value: props.value
}))`
  padding: 10px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  width: 200px;
  margin: 5px;
`;

export const SearchField = styled.input.attrs(props => ({
  type: props.type,
  placeholder: props.placeholder,
  className: props.className,
  name: props.name,
  onChange: props.onChange,
  value: props.value
}))`
  padding: 10px;
  border-radius: 3px;
  border: 0;
  border-bottom: 2px solid grey;
  width: 270px;
  margin: 5px;
  :focus {
    outline: none;
  }
`;

export const SelectField = styled.select.attrs(props => ({
  id: props.id,
  className: props.className,
  name: props.name,
  onChange: props.onChange
}))`
  padding: 10px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  width: 223px;
  margin: 5px;
  height: 38px;
  background-color: white;
`;

export const TextAreaField = styled.textarea.attrs(props => ({
  placeholder: props.placeholder,
  className: props.className,
  name: props.name,
  onChange: props.onChange,
  value: props.value
}))`
  padding: 10px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  width: 200px;
  margin: 5px;
  height: 100px;
`;

// TABLE
export const MuiTableWrapper = styled.div`
  // border: 1px solid lightgrey;
  div {
    box-shadow: none;
    max-height: fit-content !important; // to force override materialui table scroll
  }
  th {
    font-weight: bold;
    font-style: italic;
    font-size: 15px;
    color: grey;
    padding: 10px 5px;
    @media (max-width: 414px) {
      justify-content: center;
    }
  }
  td {
    padding: 5px;
  }
  [class*="MuiTypography-h6"] {
    text-align: left;
    font-size: 16px;
    color: lightgrey;
    font-family: "Press Start 2P";
  }
  @media (max-width: 414px) {
    div[class*="MUIDataTable-responsiveScrollMaxHeight"] {
      max-height: fit-content !important; // to force override materialui table scroll
    }
    td {
      font-size: 11px;
      padding: 2px;
    }
    [class*="MuiTypography-h6"] {
      font-size: 11px;
    }
    [class*="MuiToolbar-root"] {
      min-height: 0;
    }
    // .MuiTableRow-head th:nth-child(3),
    .MuiTableRow-head th:nth-child(4)
    // .MuiTableRow-head th:nth-child(5) 
    {
      display: none;
    }
    // .MuiTableRow-root td:nth-child(6),
    .MuiTableRow-root td:nth-child(8)
    // .MuiTableRow-root td:nth-child(10) 
    {
      display: none;
    }
  }
`;

export const GameTableWrapper = styled.div`
  margin-bottom: 30px;
`;

// HOME PAGE GAMES
export const NewGamesContainer = styled.div`
  text-align: left;
  align-items: center;
  padding: 10px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  margin: 10px 0;
  div {
    align-items: center;    
  }
  .upcomingGameContainer {
    font-size: 11px;
    padding: 10px;
    button {
      min-width: 10px;
    }
  }
  img {
    width: 40px;
    border-radius: 50%;
  }
  @media (max-width: 414px) {
    .upcomingGameContainer {
      padding: 30px 0;
      div {
        padding: 3px;
      }
      button {
        min-width: 10px;
      }
    }
  }
`;

export const SearchGamesContainer = styled.div`
  text-align: left;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  div {
    align-items: center;
  }
  .searchGameContainer {
    font-size: 11px;
    padding: 10px;
  }
  img {
    width: 40px;
    // border-radius: 50%;
  }
  @media (max-width: 414px) {
    .searchGameContainer {
      padding: 30px 0;
      div {
        padding: 3px;
      }
      button {
        min-width: 10px;
      }
    }
  }
`;

export const AddGameButtonWrapper = styled.div`
  display: inline-block;
  .addGameButton {
    color: #83407b;
    svg {
      font-size: 13px;
    }
    :hover {
      background: none;
    }
  }
`;

// FOOTER
export const FooterContainer = styled.div`
  margin: 15px;
  height: 20px;
  width: -webkit-fill-available;
  a {
    color: black;
  }
`;

// PUBLIC GAMES LIST
export const PublicGamesStatusText = styled.p`
  font-weight: bold;
  color: #b4b1b1;
  font-style: italic;
  @media (max-width: 414px) {
    font-size: 13px;
  }
`;

export const PublicGameName = styled.span`
  @media (max-width: 414px) {
    font-size: 11px;
  }
`;

export const PublicGamesListItemContainerInner = styled.div`
  white-space: nowrap;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* makes scrollbar invisible */
  }
  p {
    margin: 0;
  }
  
  @media (max-width: 414px) {
    margin-bottom: 20px;
  }
`
export const PublicGameDate = styled.span`
  color: #faa0a0;
  font-size: 13px;
  font-style: italic;

  @media (max-width: 414px) {
    font-size: 9px;    
  }
`
export const PublicGamePlatform = styled.span`
  color: #adadf6;
  font-style: italic;
  margin: 0 12px;
  font-size: 13px;

  @media (max-width: 414px) {
    font-size: 9px;
  }
`