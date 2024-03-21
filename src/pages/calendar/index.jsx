import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import Grid from "@mui/material/Unstable_Grid2";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,

  useTheme,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  // Carregar eventos salvos no localStorage quando o componente for montado
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    setCurrentEvents(savedEvents);
  }, []);

  // Atualizar o localStorage sempre que os eventos mudarem
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(currentEvents));
  }, [currentEvents]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };
      calendarApi.addEvent(newEvent);
      setCurrentEvents([...currentEvents, newEvent]);
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
      setCurrentEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selected.event.id)
      );
    }
  };

  const handleDeleteButtonClick = (eventId) => {
    setCurrentEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <Box m="20px">
      <Header title="Calendário" />
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <Box
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <Typography variant="h5">Eventos</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                    color:"black"
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                  <CloseIcon
                    onClick={() => handleDeleteButtonClick(event.id)}

                  >
                    X
                  </CloseIcon>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid xs={12} md={8}>
          <Box ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              events={currentEvents}
              locale={ptBrLocale}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calendar;
