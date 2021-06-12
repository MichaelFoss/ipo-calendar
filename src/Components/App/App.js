import React, { Component } from 'react';
import Calendar from '../Calendar';
import Modal from '../Modal';
import { getVisibleDates, getStartDate } from '../../Lib/dates';
import Spinner from '../Spinner';
import IPODetails from '../IPODetails';
import './App.css';
import { fetchIPOs } from '../../Utils/finnhub';
import moment from 'moment';
import VIEWS from '../../Lib/views';

const INITIAL_START_DATE = '2020-04-03';

class App extends Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(INITIAL_START_DATE),
      activeView: VIEWS.DAY,
      isLoading: true,
      modalDate: null,
      // An object of arrays, keyed by YYYY-MM-DD,
      //  with each array containing all IPOs for that day
      IPOs: {
        [INITIAL_START_DATE]: [],
      },
    };
  }

  async componentDidMount() {
    const day = moment(INITIAL_START_DATE);
    const todaysIPOs = await fetchIPOs(day, day);
    const newIPOs = {
      [INITIAL_START_DATE]: todaysIPOs[INITIAL_START_DATE],
    };
    this.setState({
      isLoading: false,
      IPOs: newIPOs,
    });
  }

  needToFetch = dates => {
    for (const date of dates) {
      if (this.state.IPOs[date] === undefined) {
        return true;
      }
    }
    return false;
  };

  cacheIPOs = async () => {
    const dates = getVisibleDates(this.state.startDate, this.state.activeView);
    if (!this.needToFetch(dates)) {
      return;
    }
    const fetchedIPOs = await fetchIPOs(moment(dates[0]), moment(dates[dates.length - 1]));
    const newIPOs = {
      ...this.state.IPOs,
      ...fetchedIPOs,
    };
    this.setState({
      IPOs: newIPOs,
    });
    // @TODO: Find the visible IPOs, and store each one in state.IPOs by fetching
  };

  onChangeStartDate = startDate => {
    // eslint-disable-next-line no-new
    new Promise((resolve, reject) => {
      this.setState({
        startDate,
        isLoading: true,
      }, async () => {
        await this.cacheIPOs();
        this.setState({
          isLoading: false,
        });
        resolve();
      });
    });
  };

  onChangeView = activeView => {
    const {
      startDate,
    } = this.state;

    // eslint-disable-next-line no-new
    new Promise((resolve, reject) => {
      this.setState({
        startDate: getStartDate(startDate, activeView),
        activeView,
        isLoading: true,
      }, async () => {
        await this.cacheIPOs();
        this.setState({
          isLoading: false,
        });
        resolve();
      });
    });
  };

  onOpenModal = date => {
    this.setState({
      modalDate: date.format('YYYY-MM-DD'),
    });
  };

  onCloseModal = () => {
    this.setState({
      modalDate: null,
    });
  };

  render() {
    const {
      isLoading,
      IPOs,
      modalDate,
      startDate,
      activeView,
    } = this.state;

    return (
      <main className="App">
        {isLoading && <Spinner />}
        <Calendar
          isDisabled={modalDate !== null}
          onDayClick={this.onOpenModal}
          IPOs={IPOs}
          onChangeStartDate={this.onChangeStartDate}
          onChangeView={this.onChangeView}
          startDate={startDate}
          activeView={activeView}
        />
        <Modal
          isOpen={modalDate !== null}
          onClose={this.onCloseModal}
          title={modalDate}
        >
          {IPOs[modalDate] && (
            <>
              <p>Total IPOs: {IPOs[modalDate].length}</p>
              {IPOs[modalDate].map(IPO => (
                <IPODetails key={IPO.symbol} IPO={IPO} />
              ))}
            </>
          )}
        </Modal>
      </main>
    );
  }
}

export default App;
