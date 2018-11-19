import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Checkbox from "@material-ui/core/Checkbox";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "../dialogs/Modal";
import Button from "@material-ui/core/Button";
import Addtag from "./AddTag";
import { deleteTag } from "../../axiosLib/promotionsAxios";
import FormHelperText from "@material-ui/core/FormHelperText";

const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5
	}
});

class TablePaginationActions extends React.Component {
	handleFirstPageButtonClick = event => {
		this.props.onChangePage(event, 0);
	};

	handleBackButtonClick = event => {
		this.props.onChangePage(event, this.props.page - 1);
	};

	handleNextButtonClick = event => {
		this.props.onChangePage(event, this.props.page + 1);
	};

	handleLastPageButtonClick = event => {
		this.props.onChangePage(
			event,
			Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
		);
	};

	render() {
		const { classes, count, page, rowsPerPage, theme } = this.props;

		return (
			<div className={classes.root}>
				<IconButton
					onClick={this.handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label="First Page"
				>
					{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
				</IconButton>
				<IconButton
					onClick={this.handleBackButtonClick}
					disabled={page === 0}
					aria-label="Previous Page"
				>
					{theme.direction === "rtl" ? (
						<KeyboardArrowRight />
					) : (
						<KeyboardArrowLeft />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Next Page"
				>
					{theme.direction === "rtl" ? (
						<KeyboardArrowLeft />
					) : (
						<KeyboardArrowRight />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Last Page"
				>
					{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
				</IconButton>
			</div>
		);
	}
}

TablePaginationActions.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
	withTheme: true
})(TablePaginationActions);

const styles = theme => ({
	root: {
		//marginTop: theme.spacing.unit * 3,
		// margin: "5% 8%"
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: "auto"
	}
});

const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

class Tagtable extends React.Component {
	state = {
		rows: [],
		page: 0,
		rowsPerPage: 5,
		modalbool: false,
		position: 0,
		editbool: false,
		id: "",
		globalerror: "",
		tagToEdit: {}
	};

	handleEditOpen = (i, id) => {
		//console.log(i, id);
		//  console.log(this.props.tags[i].name);
		let tagToEdit = this.props.tags[i];
		this.setState({
			id: id,
			position: i,
			tagToEdit,
			editbool: true
		});
	};

	handleCloseEdit = () => {
		this.setState({ editbool: false });
	};
	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};
	handleModalOpen = (e, id) => {
		//console.log(e, id);
		this.setState({ modalbool: true, position: e, id: id });
	};

	handleModalClose = () => {
		this.setState({ modalbool: false });
	};

	handleDelete = () => {
		//console.log(this.state.id);
		deleteTag(this.state.id, (err, data) => {
			if (!err) {
				// console.log(data);
				let name = this.props.tags[this.state.position].name;
				this.setState({ modalbool: false, id: "", position: 0 });

				//console.log(this.props.tags[this.state.position].name, "dlete", this.state.position);
				this.props.handleDeleteTag(name);
			} else {
				// console.log(err.msg);
				//this.setState({ globalerror: err.msg });
				this.setState({ globalerror: err.msg });
			}
		});
	};

	render() {
		const { classes } = this.props;
		const rows = this.props.tags;
		const { rowsPerPage, page, editbool } = this.state;
		const emptyRows =
			rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

		let edit, modal;
		//console.log(this.props.tags, this.state.position, "here");
		if (editbool) {
			edit = (
				<Addtag
					open={editbool}
					close={this.handleCloseEdit}
					action={"Edit"}
					tagToEdit={this.state.tagToEdit}
					id={this.state.id}
					handleEditTag={this.props.handleEditTag}
				/>
			);
		}

		if (this.state.modalbool) {
			modal = (
				<Modal
					open={this.state.modalbool}
					handleYes={this.handleDelete}
					handleNo={this.handleModalClose}
					action={"delete"}
					name={this.props.tags[this.state.position].name}
				/>
			);
		}
		return (
			<Paper className={classes.root}>
				<FormHelperText
					id="component-error-text"
					style={{
						fontSize: 20,
						fontFamily: "dekko",
						color: "red",
						marginLeft: 15
					}}
				>
					{this.state.globalerror}
				</FormHelperText>
				{edit}
				{modal}
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<CustomTableCell component="th" scope="row">
								Tag Name
							</CustomTableCell>
							<CustomTableCell
								component="th"
								scope="row"
								style={{ paddingLeft: 100 }}
							>
								Offer
							</CustomTableCell>
							<CustomTableCell component="th" scope="row">
								Profit Margin
							</CustomTableCell>
							<CustomTableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, i) => {
								let col;
								if (row.offerAvailable) {
									col = (
										<CustomTableCell
											component="th"
											scope="row"
											style={{ paddingLeft: 80 }}
										>
											<Checkbox checked={row.offerAvailable} />
											{row.offerPercentage}
										</CustomTableCell>
									);
								} else {
									col = (
										<CustomTableCell
											component="th"
											scope="row"
											style={{ paddingLeft: 100 }}
										>
											{"----"}
										</CustomTableCell>
									);
								}
								return (
									<TableRow className={classes.row} key={row._id}>
										<CustomTableCell component="th" scope="row">
											{row.name}
										</CustomTableCell>
										{col}
										<CustomTableCell component="th" scope="row">
											{row.profitMargin}
										</CustomTableCell>
										<CustomTableCell>
											<Button
												onClick={() =>
													this.handleEditOpen(page * rowsPerPage + i, row._id)
												}
											>
												<EditIcon />
											</Button>
											<Button
												onClick={() =>
													this.handleModalOpen(page * rowsPerPage + i, row._id)
												}
											>
												<DeleteIcon />
											</Button>
										</CustomTableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 48 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								colSpan={3}
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActionsWrapped}
							/>
						</TableRow>
					</TableFooter>
					{/* <TablePagination colSpan={3} count={rows.length}  /> */}
				</Table>
			</Paper>
		);
	}
}

Tagtable.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.array.isRequired
};

export default withStyles(styles)(Tagtable);
