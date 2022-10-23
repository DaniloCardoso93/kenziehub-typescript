import styled from "styled-components"

export const BgModal = styled.div`

    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background-color: rgba(33, 37, 41, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
`

export const DivModal = styled.div`

    width: 80%;
    height: 290px;

    background-color: var(--grey3);

    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
        width: 370px;
        height: 342px;
    }

`

export const TitleModal = styled.div`

    width: 100%;
    height: 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: var(--grey2);
    color: var(--grey0);

    border-radius: 8px;

    font-size:var(--text2);

    @media (min-width: 800px) {
        font-size:var(--text);
    }

    p{
       
        margin-left:20px ;
    }

    span{ 
        cursor: pointer;
        margin-right: 20px;
    }

`