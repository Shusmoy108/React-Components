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
import { ProductsConsumer } from "../../contexts/ProductsContext";

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
        margin: theme.spacing.unit * 2 + "px " + theme.spacing.unit + "px",
        width: "97%"
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
    },
    popper: { zIndex: "99999" }
});

class IntegrationAutosuggest extends React.Component {
    state = {
        // popper: "",
        suggestions: []
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.categories)
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleChange = name => (event, { newValue }) => {
        // this.setState({
        //     [name]: newValue
        // });
        this.props.handleCategoryChange(newValue);
    };

    shouldRenderSuggestions = value => {
        return value.trim().length >= 0;
    };

    render() {
        const { classes, pcategory } = this.props;
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
            <div className={classes.root}>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        classes,
                        placeholder: "Category",
                        value: pcategory,
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
                            className={classes.popper}
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
            </div>
        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired
};

const consumerComponent = props => (
    <ProductsConsumer>
        {({ categories, pcategory, handleCategoryChange }) => {
            let data = {
                categories,
                handleCategoryChange,
                pcategory
            };
            return <IntegrationAutosuggest {...{ ...props, ...data }} />;
        }}
    </ProductsConsumer>
);

export default withStyles(styles)(consumerComponent);
