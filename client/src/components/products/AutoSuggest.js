import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/SearchRounded";
import Button from "@material-ui/core/Button";

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input
                }
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value, options) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return options.filter(suggestion => {
        const keep =
            suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        return keep;
    });
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        display: "flex"
    },
    container: {
        position: "relative"
    },
    suggestionsContainerOpen: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    suggestion: {
        display: "block"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none",
        height: 200,
        overflowY: "auto"
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

class IntegrationAutosuggest extends React.Component {
    state = {
        popper: "",
        suggestions: []
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.suggestions)
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue
        });
    };

    shouldRenderSuggestions = value => {
        return value.trim().length >= 0;
    };

    render() {
        const { classes, placeholder, handleSearch } = this.props;
        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            shouldRenderSuggestions: this.shouldRenderSuggestions,
            getSuggestionValue,
            renderSuggestion
        };

        return (
            <form
                className={classes.root}
                onSubmit={e => handleSearch(e, this.state.popper)}
            >
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        placeholder: placeholder,
                        value: this.state.popper,
                        onChange: this.handleChange("popper"),
                        inputRef: node => {
                            this.popperNode = node;
                        },
                        InputLabelProps: {
                            shrink: true
                        }
                    }}
                    theme={{
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion
                    }}
                    renderSuggestionsContainer={options => (
                        <Popper
                            anchorEl={this.popperNode}
                            open={Boolean(options.children)}
                        >
                            <Paper
                                square
                                {...options.containerProps}
                                style={{
                                    width: this.popperNode
                                        ? this.popperNode.clientWidth
                                        : null
                                }}
                            >
                                {options.children}
                            </Paper>
                        </Popper>
                    )}
                />
                <Button type="submit" color="primary">
                    <SearchIcon />
                </Button>
            </form>
        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntegrationAutosuggest);
