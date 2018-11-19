import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchEngine from "./SearchEngine";
import Grid from "@material-ui/core/Grid";
import Tagtable from "./TagTable";
import Addtag from "./AddTag";
//import BackIcon from "@material-ui/icons/ArrowBack";
import { getTag } from "../../axiosLib/promotionsAxios";

const styles = theme => ({
    button: { float: "right" },
    extendedIcon: {
        marginRight: theme.spacing.unit
    }
});

class TagPage extends React.Component {
    state = {
        value: 0,
        addbool: false,
        tags: [],
        filteredTags: []
    };

    handleClickOpen = () => {
        this.setState({ addbool: true });
    };

    handleAddTag = tag => {
        //console.log(tags);
        let tags = this.state.tags;
        tags.push(tag);
        this.setState({ tags, filteredTags: tags });
    };

    handleDeleteTag = name => {
        let tags = this.state.tags;
        tags = tags.filter(tag => tag.name !== name);
        this.setState({ tags, filteredTags: tags });
    };

    handleEditTag = (id, updatedTag) => {
        let tags = this.state.tags;
        let tagIndex = tags.findIndex(tag => tag._id === id);
        tags[tagIndex] = updatedTag;

        if (this.state.filteredTags.length > 1) {
            this.setState({ tags, filteredTags: tags });
        } else {
            let searchtag = [];
            searchtag.push(updatedTag);
            this.setState({ filteredTags: searchtag });
        }
    };

    handleClose = () => {
        this.setState({ addbool: false });
    };

    handleSearch = e => {
        let tags = this.state.tags;
        let tagIndex = tags.findIndex(tag => tag.name === e);
        let searchtag = [];

        if (tagIndex !== -1) {
            searchtag.push(tags[tagIndex]);
            this.setState({ filteredTags: searchtag });
        } else {
            this.setState({ filteredTags: tags });
        }
    };
    // handleAdd = (tagname, offeravailable, offerpercentage, profitmargin) => {
    //     console.log(tagname, offeravailable, offerpercentage, profitmargin, "add");
    // }
    handleBack = () => {
        let tags = this.state.tags;
        this.setState({ filteredTags: tags });
    };
    componentDidMount = () => {
        let that = this;
        getTag((err, data) => {
            if (!err) {
                that.setState({ tags: data.tag, filteredTags: data.tag });
            }
        });
    };
    render() {
        const { classes } = this.props;
        let add;
        if (this.state.addbool) {
            add = (
                <Addtag
                    open={this.state.addbool}
                    handleAddTag={this.handleAddTag}
                    id=""
                    action={"Add"}
                    tagToEdit={{
                        name: "",
                        offerAvailable: false,
                        offerPercentage: 0,
                        profitMargin: 0
                    }}
                    add={this.handleAdd}
                    close={this.handleClose}
                />
            );
        }
        return (
            <div
                style={{
                    margin: "5%"
                }}
            >
                <Addtag
                    open={this.state.addbool}
                    handleAddTag={this.handleAddTag}
                    id=""
                    action={"Add"}
                    tagToEdit={{
                        name: "",
                        offerAvailable: false,
                        offerPercentage: 0,
                        profitMargin: 0
                    }}
                    add={this.handleAdd}
                    close={this.handleClose}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <SearchEngine
                        options={this.state.tags.map(tag => ({
                            label: tag.name
                        }))}
                        search={this.handleSearch}
                        searchField={"Tag Name"}
                    />

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.handleClickOpen}
                        className={classes.button}
                    >
                        Add A Tag
                        </Button>

                </div>
                <Tagtable
                    handleEditTag={this.handleEditTag}
                    handleDeleteTag={this.handleDeleteTag}
                    tags={this.state.filteredTags}
                />
            </div >
        );
    }
}

TagPage.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(TagPage);
