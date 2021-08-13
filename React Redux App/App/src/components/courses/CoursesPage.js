import React from "react";
import { connect } from "react-redux"; // connect function connects our component and redux
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import Proptypes from "prop-types";
import { createStore } from "redux";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import { Spinner } from "../common/Spinner";
import { toast } from "react-toastify";
// we want to add some lifecycle methods and state to it, so we are creating this as a class component, we can use function component along with
// useState and useEffect hooks, but we want some familiarity with class components so we are doing this.

class CoursesPage extends React.Component {
  //binding is done in the constructor, binding is necessary because without it, handleChange will not be able to access the reference of current object via this
  // we can also bind in the input tag, but binding in constructor is preffered. We can also do without using binding keyword, make the handle change function an arrow function, then it will bind it automatically, arrow functions inherit the binding context,(this arrow function mehtod is called class field).We will use arrow function approach

  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    //using object destructuring
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleDeleteCourse = async (course) => {
    toast.success("Course Deleted.");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete Failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      // we can add submit event to the save button but this is not recommended for accessibility, it is preferred to use it in the form tag, because hitting enter key will also do the submission of the form.
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </div>
        )}
      </>
    );
  }
}

CoursesPage.protoTypes = {
  courses: Proptypes.array.isRequired,
  actions: Proptypes.object.isRequired,
  authors: Proptypes.array.isRequired,
  loading: Proptypes.bool.isRequired,
};

// what part of state we want to expose to our components,
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }), // be specific, request only the data that your component needs
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}
// what actions do we want to expose on our components, it is optional
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); // connect automatically passes dispatch parameter
// map function takes 2 parameters mapStateToProps and mapDispatchToProps, and will return a function, and to that function CoursesPage will be passed as a parameter
