import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Media from 'react-media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Element from '../components/Onboarding/Element';
import Subelement from '../components/Onboarding/Subelement';
import Objective from '../components/Onboarding/Objective';
import TribeDeclaration from '../components/Onboarding/TribeDeclaration';

import axios from '../utils/axios';

import { setOnboarding, updateUser } from '../actions';

//  Passion and elements terms are interchangeble

function getObjectItems(items) {
  return items.map((item, idx) => {
    return { index: idx, selected: false, value: item };
  });
}
const getSelectedObjectives = items => {
  let items_ = items.filter(item => item.selected);
  let selectedItems = items_.map(item => item.text);
  return selectedItems;
};
const getSelectedSubelements = items => {
  // items.map(item => {
  //   if (item.selected === true) {
  //     selectedItemsList.push(item.value);
  //   }
  // });
  let items_ = items.filter(item => item.selected);
  let selectedItems = items_.map(item => item.value);
  return selectedItems;
};
function getSortedPassionlist(items) {
  let itemsList = items.map((item, idx) => {
    return { index: idx, value: item.passion };
  });
  return itemsList.sort((a, b) => a.value.localeCompare(b.value));
}

const allObjectivesList = [
  { text: 'Improve your skills', selected: false },
  { text: 'Gain more knowledge', selected: false },
  { text: 'Grow your team', selected: false },
  { text: 'Start a company / business', selected: false },
  {
    text: 'Explore other companies / verticals / opportunities',
    selected: false
  },
  { text: 'Grow or expand your business/company', selected: false },
  { text: 'Invest', selected: false },
  { text: 'Explore new projects', selected: false },
  { text: 'Mentor others', selected: false },
  { text: 'Organize events', selected: false },
  { text: 'Raise funding', selected: false },
  { text: 'Find a co-founder or partner', selected: false },
  { text: 'Grow your network', selected: false },
  { text: 'Find my passion', selected: false }
];

class Onboarding extends Component {
  state = {
    isNext: false,
    tribe: '',
    stage: 0,
    element: '',
    passionList: [],
    passionLoaded: false,
    allSubelements: [],
    subelementsLength: 0,
    objectives: [], // ????/
    allObjectives: allObjectivesList,
    objectivesLength: 0,
    objectiveInput: ''
  };
  componentDidMount() {
    axios
      .get(`passionlist`)
      .then(res => {
        const result = getSortedPassionlist(res.data);
        console.log(result);
        this.setState({ passionList: result, passionLoaded: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  postData = () => {
    const selectedSubList = getSelectedSubelements(this.state.allSubelements);
    let selectedObjectives = getSelectedObjectives(this.state.allObjectives);
    if (this.state.objectiveInput !== '') {
      selectedObjectives.push(this.state.objectiveInput);
    }
    const payload = {
      passion: this.state.element,
      subpassion: selectedSubList,
      objectives: selectedObjectives,
      onboarding: true
    };

    axios
      .patch('updateprofile', payload)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });

    axios
      .post('mytribe', {
        passion: this.state.element
      })
      .then(res => {
        this.setState(prevSate => ({
          stage: prevSate.stage + 1,
          tribe: res.data.tribe
        }));

        this.props.dispatch(updateUser(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  previousStep = () => {
    this.setState(prevSate => ({
      stage: prevSate.stage - 1
    }));
  };
  nextStep = () => {
    this.setState(prevSate => ({
      stage: prevSate.stage + 1
    }));
  };

  setSubelements = subelememts => {
    let selected = subelememts.filter(item => item.selected === true);
    this.setState({
      allSubelements: subelememts,
      subelementsLength: selected.length
    });
  };
  setObjectives = objectives => {
    let selected = objectives.filter(item => item.selected === true);
    this.setState({
      allObjectives: objectives,
      objectivesLength: selected.length
    });
  };
  setObjectiveInput = input => {
    this.setState({ objectiveInput: input });
  };

  finalStep = () => {
    this.props.dispatch(setOnboarding());
  };

  goToSubelements = element => {
    if (element !== this.state.element) {
      axios
        .get(`subpassionlist/?element=${element}`)
        .then(res => {
          let result;

          if (res.data && res.data.length > 0) result = res.data[0].subpassion;
          if (result) {
            result = getObjectItems(result);
            this.setState({ allSubelements: result });
          } else {
            this.setState({ allSubelements: [] });
          }
          this.setState({ element });
        })
        .catch(err => {
          console.log(err);
        });
    }
    // setTimeout(() => {
    //   this.nextStep();
    // }, 1000);
  };

  render() {
    const {
      stage,
      element,
      allSubelements,
      subelementsLength,
      allObjectives,
      objectivesLength,
      objectiveInput,
      passionList,
      passionLoaded,
      tribe
    } = this.state;

    const showPrevious = stage !== 0 && stage !== 3;

    const showElement = stage === 0;
    const showSubelement = stage === 1;
    const showObjective = stage === 2;
    const showTribe = stage === 3;

    if (this.props.onboarding) return <Redirect to='/home' />;

    return (
      <div className='onboarding'>
        <div className='container h-100'>
          <div className='row'>
            <Media query='(min-width: 768px)'>
              {matches =>
                matches ? (
                  <div className='col-md-3 d-none d-md-flex flex-column justify-content-evenly align-items-end z-index-1'>
                    {steps.map((item, idx) => (
                      <Step key={idx} stage={stage} idx={idx} data={item} />
                    ))}
                  </div>
                ) : (
                  steps.map((item, idx) => (
                    <StepMobile key={idx} stage={stage} idx={idx} data={item} />
                  ))
                )
              }
            </Media>
            <div className='col-md-9'>
              <div className='card box-shadow'>
                <div className='card-body bg-white text-center'>
                  {showElement && (
                    <Element
                      key={passionLoaded}
                      passionList={passionList}
                      element={element}
                      nextStep={this.goToSubelements}
                    />
                  )}

                  {showSubelement && (
                    <Subelement
                      key={element}
                      setSubelements={this.setSubelements}
                      allSubelements={allSubelements}
                      element={element}
                    />
                  )}

                  {showObjective && (
                    <Objective
                      setObjectives={this.setObjectives}
                      allObjectives={allObjectives}
                      setInput={this.setObjectiveInput}
                      input={objectiveInput}
                    />
                  )}
                  {showTribe && (
                    <TribeDeclaration
                      tribe={tribe}
                      finalStep={this.finalStep}
                    />
                  )}
                </div>
                <div className='card-footer bg-secondary d-flex justify-content-between flex-wrap'>
                  {showPrevious && (
                    <button
                      type='button'
                      className='btn btn-outline-info'
                      onClick={this.previousStep}
                    >
                      Previous
                    </button>
                  )}
                  {showElement && (
                    <button
                      type='button'
                      className='btn btn-info btn-arrow ml-auto'
                      onClick={this.nextStep}
                      disabled={element == ''}
                    >
                      Next <FontAwesomeIcon icon='arrow-right' />
                    </button>
                  )}

                  {showSubelement && (
                    <button
                      type='button'
                      className='btn btn-info btn-arrow ml-auto'
                      onClick={this.nextStep}
                      disabled={subelementsLength === 0}
                    >
                      Next <FontAwesomeIcon icon='arrow-right' />
                    </button>
                  )}
                  {showObjective && (
                    <button
                      type='button'
                      className='btn btn-info btn-arrow ml-auto'
                      onClick={this.postData}
                      disabled={objectivesLength === 0}
                    >
                      Next <FontAwesomeIcon icon='arrow-right' />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const steps = [
  {
    title: 'Select element',
    text: "Element is what you have always loved to do, it's your passion."
  },
  {
    title: 'Select specific',
    text:
      "Let's narrow it down a bit to help us to know you better and help in  your journey."
  },
  { title: 'Select objectives', text: '' }
];

const Step = ({ stage, idx, data }) => (
  <div className={`step d-flex  ${stage === idx && 'selected'}`}>
    <div className='step-text'>
      <h5>{data.title}</h5>
      {data.text}
    </div>{' '}
    <div className='step-icon flex-shrink-0'>
      {stage > idx ? <FontAwesomeIcon icon='check' /> : idx + 1}
    </div>
  </div>
);

const StepMobile = ({ stage, idx, data }) => {
  if (stage != idx) return null;
  return (
    <div className='step step-md d-flex'>
      <div className='step-text'>
        <h5>{data.title}</h5>
        {data.text}
      </div>
      <div className='step-icon flex-shrink-0'>{idx + 1}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    onboarding: state.auth.user.onboarding
  };
};
export default connect(mapStateToProps)(Onboarding);
