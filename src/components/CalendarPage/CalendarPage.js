import React, { useState, useContext, useEffect } from "react";
import "./CalendarPage.css";
import { getMonth } from "./util";
import styled from "styled-components";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";

const Container = styled.div `
  display: flex;
  height: 100vh;
  flex-direction: column;
`
const BodyContainer = styled.div `
display: flex;
  flex-shrink: 1;
`
function CalendarPage() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <Container className="h-screen flex flex-col">
        <CalendarHeader />
        <BodyContainer className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </BodyContainer>
      </Container>
    </React.Fragment>
  );
}

export default CalendarPage;
