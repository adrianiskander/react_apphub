import React from 'react';


const AUDIO_SRC = 'https://sampleswap.org/samples-ghost/MELODIC%20LOOPS/SAMPLED%20MUSIC%20LOOPS/1494[kb]055_slow-ballad-guitar-strings.wav.mp3';
const BREAK_LENGTH_MIN = 5;
const DEFAULT_ACTIVITY_NAME = 'Session';
const INTERVAL_MS = 1000;
const SESSION_LENGTH_MIN = 25;


export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: BREAK_LENGTH_MIN,
      sessionLength: SESSION_LENGTH_MIN,
      currentActivity: DEFAULT_ACTIVITY_NAME,
      timeLeft: `${SESSION_LENGTH_MIN}:0`,
      isTimerRunning: false,
      intervalId: null,
      intervalMs: INTERVAL_MS
    }
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.switchActivity = this.switchActivity.bind(this);
    this.tickTime = this.tickTime.bind(this);

    this.audioRef = React.createRef();
  }

  displayTimeLeft() {
    // Convert time to MM:SS string.
    let timeLeft = this.state.timeLeft.split(':');

    let mins = Number(timeLeft[0]);
    let secs = Number(timeLeft[1]);
    
    if (mins < 10) {mins = `0${mins.toString()}`}
    if (secs < 10) {secs = `0${secs.toString()}`}

    return [mins, secs].join(':');
  }

  decrement(paramName) {
    if (paramName === 'break') {
      let breakLength = this.state.breakLength;
      breakLength > 1
        ? breakLength -= 1
        : breakLength;
      this.setState({
        breakLength
      });
    } else if (paramName === 'session') {
      let sessionLength = this.state.sessionLength;
      sessionLength > 1
        ? sessionLength -= 1
        : sessionLength;
      this.setState({
        sessionLength,
        timeLeft: `${sessionLength}:00`
      });
    }
  }

  increment(paramName) {
    if (paramName === 'break') {
      let breakLength = this.state.breakLength;
      breakLength < 60
        ? breakLength += 1
        : breakLength;
      this.setState({
        breakLength
      });
    } else if (paramName === 'session') {
      let sessionLength = this.state.sessionLength;
      sessionLength < 60
        ? sessionLength += 1
        : sessionLength;
      this.setState({
        sessionLength,
        timeLeft: `${sessionLength}:00`
      });
    }
  }

  playSound() {
    let audio = this.audioRef.current;
    audio.currentTime = 0;
    audio.play();
  }

  stopSound() {
    let audio = this.audioRef.current;
    audio.pause();
    audio.currentTime = 0;
  }

  resetTimer() {
    // Reset app to default state.
    window.clearInterval(this.state.intervalId);
    this.stopSound();
    this.setState({
      currentActivity: DEFAULT_ACTIVITY_NAME,
      breakLength: BREAK_LENGTH_MIN,
      sessionLength: SESSION_LENGTH_MIN,
      timeLeft: '25:00',
      isTimerRunning: false
    });
  }

  startTimer() {
    // Start or continue timer.
    if (this.state.isTimerRunning) {
      window.clearInterval(this.state.intervalId);
      this.setState(state => ({
        isTimerRunning: false,
        intervalId: null
      }));
    } else {
      let intervalId = window.setInterval(() => {
        this.tickTime();
      }, this.state.intervalMs);
      this.setState({
        isTimerRunning: true,
        intervalId
      });
    }
  }

  stopTimer() {
    // Stop (pause) timer.
    window.clearInterval(this.state.intervalId);
    this.setState({
      isTimerRunning: false
    });
  }

  switchActivity() {
    // Switch activity between Session<->Break.
    let currentActivity = this.state.currentActivity;
    if (currentActivity === 'Session') {
      currentActivity = 'Break';
      let timeLeft = `${this.state.breakLength}:0`;
      this.setState({
        currentActivity,
        timeLeft
      }, () => {
        this.startTimer();
      });
    } else {
      currentActivity = 'Session';
      let timeLeft = `${this.state.sessionLength}:0`;
      this.setState({
        currentActivity,
        timeLeft
      }, () => {
        this.startTimer();
      });
    }
  }

  tickTime() {
    let timeLeft = this.state.timeLeft.split(':');
    let mins = Number(timeLeft[0]);
    let secs = Number(timeLeft[1]);

    secs -= 1;
    if (secs < 0) {
      secs = 59;
      mins -= 1;
    }

    timeLeft = `${mins}:${secs}`;

    this.setState({
      timeLeft: timeLeft
    });

    if (mins === 0 && secs === 0) {
      this.stopTimer();
      this.playSound();

      // Wait one second to let FCC tests recognize a switch.
      // Without this tests will run infinitely.
      window.setTimeout(() => {
        this.switchActivity();
      }, this.state.intervalMs);
    }
  }

  render() {
    return(
      <div className="cover bg-lightgreen d-flex align-items-center justify-content-center">
        <div className="container d-flex justify-content-center">
          <div className="Pomodoro animated pulse faster">
            <audio
              ref={this.audioRef}
              preload="auto"
              src={AUDIO_SRC}
            ></audio>

            <div className="row">
              <div className="col-12">
                <div className="Pomodoro-label">Break Length</div>
              </div>
              <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                <div className="Pomodoro-display">{this.state.breakLength}</div>
              </div>
              <div className="col-6 col-sm-3">
                <button className="Pomodoro-btn w-100" onClick={() => this.decrement('break')}>-</button>
              </div>
              <div className="col-6 col-sm-3">
                <button className="Pomodoro-btn w-100" onClick={() => this.increment('break')}>+</button>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <div className="Pomodoro-label">Session Length</div>
              </div>

              <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                <div className="Pomodoro-display">{this.state.sessionLength}</div>
              </div>

              <div className="col-6 col-sm-3">
                <button className="Pomodoro-btn w-100" onClick={() => this.decrement('session')}>-</button>
              </div>
              <div className="col-6 col-sm-3">
                <button className="Pomodoro-btn w-100" onClick={() => this.increment('session')}>+</button>
              </div>
            </div>

            <div className="row mt-3">

              <div className="col-12">
                <div className="Pomodoro-label">{this.state.currentActivity}</div>
              </div>

              <div className="col-12 col-sm-6 mb-3 mb-sm-0">
                <div className="Pomodoro-display">
                  <div>{this.displayTimeLeft()}</div>
                </div>
              </div>

              <div className="col-6 col-sm-3">
                {
                  this.state.isTimerRunning
                    ? <button className="Pomodoro-btn w-100" onClick={this.stopTimer}>PAUSE</button>
                    : <button className="Pomodoro-btn w-100" onClick={this.startTimer}>START</button>
                }
              </div>

              <div className="col-6 col-sm-3">
                <button className="Pomodoro-btn Pomodoro-btn-orange w-100" onClick={this.resetTimer}>RESET</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
