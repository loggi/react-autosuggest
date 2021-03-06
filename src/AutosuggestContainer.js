import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createStore } from 'redux';
import reducer from './reducerAndActions';
import Autosuggest from './Autosuggest';

function noop() {}

const defaultTheme = {
  container: 'react-autosuggest__container',
  containerOpen: 'react-autosuggest__container--open',
  input: 'react-autosuggest__input',
  suggestionsContainer: 'react-autosuggest__suggestions-container',
  suggestion: 'react-autosuggest__suggestion',
  suggestionFocused: 'react-autosuggest__suggestion--focused',
  sectionContainer: 'react-autosuggest__section-container',
  sectionTitle: 'react-autosuggest__section-title',
  sectionSuggestionsContainer: 'react-autosuggest__section-suggestions-container'
};

function mapToAutowhateverTheme(theme) {
  let result = {};

  for (const key in theme) {
    switch (key) {
      case 'suggestionsContainer':
        result['itemsContainer'] = theme[key];
        break;

      case 'suggestion':
        result['item'] = theme[key];
        break;

      case 'suggestionFocused':
        result['itemFocused'] = theme[key];
        break;

      case 'sectionSuggestionsContainer':
        result['sectionItemsContainer'] = theme[key];
        break;

      default:
        result[key] = theme[key];
    }
  }

  return result;
}

export default class AutosuggestContainer extends Component {
  static propTypes = {
    suggestions: PropTypes.array.isRequired,
    onSuggestionsUpdateRequested: PropTypes.func,
    getSuggestionValue: PropTypes.func.isRequired,
    renderSuggestion: PropTypes.func.isRequired,
    shouldRenderSuggestions: PropTypes.func,
    onSuggestionSelected: PropTypes.func,
    multiSection: PropTypes.bool,
    renderSectionTitle: PropTypes.func,
    getSectionSuggestions: PropTypes.func,
    focusInputOnSuggestionClick: PropTypes.bool,
    theme: PropTypes.object,
    id: PropTypes.string,
    customRenderInput: PropTypes.func,
    customRenderList: PropTypes.func,
    inputProps: (props, propName) => {
      const inputProps = props[propName];

      if (!inputProps.hasOwnProperty('value')) {
        throw new Error('\'inputProps\' must have \'value\'.');
      }

      if (!inputProps.hasOwnProperty('onChange')) {
        throw new Error('\'inputProps\' must have \'onChange\'.');
      }
    }
  };

  static defaultProps = {
    onSuggestionsUpdateRequested: noop,
    shouldRenderSuggestions: value => value.trim().length > 0,
    onSuggestionSelected: noop,
    multiSection: false,
    focusInputOnSuggestionClick: true,
    theme: defaultTheme,
    id: '1',
    selectFirst: false,
    auxiliarComponent: null,
    renderSectionTitle() {
      throw new Error('`renderSectionTitle` must be provided');
    },
    getSectionSuggestions() {
      throw new Error('`getSectionSuggestions` must be provided');
    }
  };

  constructor() {
    super();

    const initialState = {
      isFocused: false,
      isCollapsed: true,
      focusedSectionIndex: null,
      focusedSuggestionIndex: 0,
      valueBeforeUpDown: null,
      lastAction: null,
      selectFirst: false
    };

    this.store = createStore(reducer, initialState);

    this.saveInput = this.saveInput.bind(this);
  }

  saveInput(input) {
    this.input = input;
  }

  render() {
    const {
      multiSection, shouldRenderSuggestions, suggestions,
      onSuggestionsUpdateRequested, getSuggestionValue, renderSuggestion,
      renderSectionTitle, getSectionSuggestions, inputProps,
      onSuggestionSelected, focusInputOnSuggestionClick, theme, id,
      selectFirst, auxiliarComponent, auxiliarComponentPosition, customInput,
      customRenderInput, customRenderList
    } = this.props;

    return (
      <Autosuggest
        customInput={customInput}
        multiSection={multiSection}
        shouldRenderSuggestions={shouldRenderSuggestions}
        suggestions={suggestions}
        onSuggestionsUpdateRequested={onSuggestionsUpdateRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
        focusInputOnSuggestionClick={focusInputOnSuggestionClick}
        selectFirst={selectFirst}
        auxiliarComponent={auxiliarComponent}
        auxiliarComponentPosition={auxiliarComponentPosition}
        theme={mapToAutowhateverTheme(theme)}
        id={id}
        inputRef={this.saveInput}
        store={this.store}
        customRenderInput={customRenderInput}
        customRenderList={customRenderList}
      />
    );
  }
}