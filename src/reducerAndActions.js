const INPUT_FOCUSED = 'INPUT_FOCUSED';
const INPUT_BLURRED = 'INPUT_BLURRED';
const INPUT_CHANGED = 'INPUT_CHANGED';
const UPDATE_FOCUSED_SUGGESTION = 'UPDATE_FOCUSED_SUGGESTION';
const REVEAL_SUGGESTIONS = 'REVEAL_SUGGESTIONS';
const CLOSE_SUGGESTIONS = 'CLOSE_SUGGESTIONS';
const UPDATE_SELECT_FIRST = 'UPDATE_SELECT_FIRST';

export function updateSelectFirst() {
  return {
    type: UPDATE_SELECT_FIRST
  }
}

export function inputFocused(shouldRenderSuggestions) {
  return {
    type: INPUT_FOCUSED,
    shouldRenderSuggestions
  };
}

export function inputBlurred() {
  return {
    type: INPUT_BLURRED
  };
}

export function inputChanged(shouldRenderSuggestions, lastAction) {
  return {
    type: INPUT_CHANGED,
    shouldRenderSuggestions,
    lastAction
  };
}

export function updateFocusedSuggestion(sectionIndex, suggestionIndex, value) {
  return {
    type: UPDATE_FOCUSED_SUGGESTION,
    sectionIndex,
    suggestionIndex,
    value
  };
}

export function revealSuggestions() {
  return {
    type: REVEAL_SUGGESTIONS
  };
}

export function closeSuggestions(lastAction) {
  return {
    type: CLOSE_SUGGESTIONS,
    lastAction
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case UPDATE_SELECT_FIRST:
      return {
        ...state,
        selectFirst: true
      }
    case INPUT_FOCUSED:
      return {
        ...state,
        isFocused: true,
        isCollapsed: !action.shouldRenderSuggestions
      };

    case INPUT_BLURRED:
      return {
        ...state,
        isFocused: false,
        focusedSectionIndex: null,
        focusedSuggestionIndex: state.selectFirst ? 0 : null,
        valueBeforeUpDown: null,
        isCollapsed: true
      };

    case INPUT_CHANGED:
      return {
        ...state,
        focusedSectionIndex: null,
        focusedSuggestionIndex: state.selectFirst ? 0 : null,
        valueBeforeUpDown: null,
        isCollapsed: !action.shouldRenderSuggestions,
        lastAction: action.lastAction
      };

    case UPDATE_FOCUSED_SUGGESTION: {
      const { value, sectionIndex, suggestionIndex } = action;
      const valueBeforeUpDown =
        state.valueBeforeUpDown === null && typeof value !== 'undefined'
          ? value
          : state.valueBeforeUpDown;

      return {
        ...state,
        focusedSectionIndex: sectionIndex,
        focusedSuggestionIndex: (!state.selectFirst) ? suggestionIndex : (suggestionIndex) ? suggestionIndex : 0,
        valueBeforeUpDown
      };
    }

    case REVEAL_SUGGESTIONS:
      return {
        ...state,
        isCollapsed: false
      };

    case CLOSE_SUGGESTIONS:
      return {
        ...state,
        focusedSectionIndex: null,
        focusedSuggestionIndex: state.selectFirst ? 0 : null,
        valueBeforeUpDown: null,
        isCollapsed: true,
        lastAction: action.lastAction
      };

    default:
      return state;
  }
}
