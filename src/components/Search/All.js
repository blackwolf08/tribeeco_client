// import React, { Component } from "react";
// import { Link } from "react-router-dom";

// import axios from "../../utils/axios";

// import qs from "query-string";
// import ProfileCard from "../Common/ProfileCard";
// import ProjectCard from "../Common/ProjectCard";
// import PostCard from "./PostCard";

// class People extends Component {
//   state = {
//     query: "",
//     loading: true,
//     data: []
//   };
//   loadData() {
//     // axios
//     //   .get(`searchpeople/?q=${this.state.query}`)
//     //   .then(res => {
//     //     console.log(res.data);
//     //     this.setState({ data: res.data });
//     //   })
//     //   .catch(err => {
//     //     console.log(err);
//     //   });
//   }
//   componentDidMount() {
//     const values = qs.parse(this.props.location.search);
//     this.setState({ query: values.q });
//     this.loadData();
//   }
//   static getDerivedStateFromProps(nextProps, prevState) {
//     const values = qs.parse(nextProps.location.search);
//     if (values.q !== prevState.query) {
//       return {
//         query: values.q
//       };
//     }
//     console.log(values.q, prevState.query);
//     return null;
//   }
//   componentDidUpdate(prevProps) {
//     const values = qs.parse(prevProps.location.search);
//     if (values.q !== this.state.query) {
//       this.loadData();
//       console.log("componentDidUpdate", this.state.query);
//     }
//   }
//   render() {
//     const { loading, data } = this.state;
//     return (
//       <div className="row">
//         <div className="col-md-6">
//           <div className="d-flex flex-wrap justify-content-center align-items-baseline mt-3">
//             {loading &&
//               (data &&
//                 data.map((datum, idx) => (
//                   <ProfileCard data={datum} key={idx} />
//                 )))}

//             {[...Array(2)].map((item, idx) => (
//               <ProfileCard data={{ id: 1, fullname: "Mayank" }} key={idx} />
//             ))}
//           </div>

//           <div className="d-flex flex-wrap justify-content-center align-items-baseline mt-3">
//             {loading &&
//               (data &&
//                 data.map((datum, idx) => (
//                   <ProjectCard data={datum} key={idx} />
//                 )))}
//             {[...Array(4)].map((item, idx) => (
//               <ProjectCard
//                 data={{
//                   title: "Project name",
//                   user: {
//                     fullname: "Yash"
//                   }
//                 }}
//                 className="m-3"
//                 key={idx}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="d-flex flex-wrap flex-column justify-content-center align-items-center mt-3">
//             {loading &&
//               (data &&
//                 data.map((datum, idx) => <PostCard data={datum} key={idx} />))}

//             {[...Array(2)].map((item, idx) => (
//               <PostCard
//                 data={{
//                   user: {
//                     fullname: "Yash",
//                     Professional_Headline: "Backend Dev"
//                   },
//                   title: "title 1",
//                   body: "body"
//                 }}
//                 key={idx}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default People;
