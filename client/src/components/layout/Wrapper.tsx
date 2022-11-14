import React from "react";
import styled from "styled-components";

interface Props {
	children: JSX.Element;
}

const Container = styled.div`
	margin: 10rem 0;
`;

function Wrapper({ children }: Props) {
	return <Container>{children}</Container>;
}

export default Wrapper;
