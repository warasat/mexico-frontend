import { Table } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import SidebarNav from "../sidebar";
import {
  doctor_thumb_01,
  doctor_thumb_02,
  doctor_thumb_03,
  doctor_thumb_04,
  doctor_thumb_05,
  doctor_thumb_06,
  doctor_thumb_07,
  doctor_thumb_08,
  doctor_thumb_09,
  doctor_thumb_10,
} from "../imagepath";
import { Link } from "react-router-dom";
import Header from "../header";

const AdminDoctors = () => {
  const data = [
    {
      id: 1,
      DoctorName: "Dr. Darren Elder",
      Speciality: "Dental ",

      Date: "11 Jun 2019",
      time: "4.50 AM",
      image: doctor_thumb_02,
      AccountStatus: "checkbox",
    },
    {
      id: 2,
      DoctorName: "Dr. Deborah Angel",
      Speciality: "Cardiology ",

      Date: "4 Jan 2018",
      time: "9.40 AM",
      image: doctor_thumb_03,
      AccountStatus: "checkbox",
    },
    {
      id: 3,
      DoctorName: "Dr. John Gibbs",
      Speciality: "Dental ",

      Date: "21 Apr 2018",
      time: "02.59 PM",
      image: doctor_thumb_09,
      AccountStatus: "checkbox",
    },
    {
      id: 4,
      DoctorName: "Dr. Katharine Berthold",
      Speciality: "Orthopaedics ",

      Date: "23 Mar 2019",
      time: "02.50 PM",
      image: doctor_thumb_06,
      AccountStatus: "checkbox",
    },
    {
      id: 5,
      DoctorName: "Dr. Linda Tobin",
      Speciality: "Neurology ",

      Date: "14 Dec 2018",
      time: "01.59 AM",
      image: doctor_thumb_07,
      AccountStatus: "checkbox",
    },
    {
      id: 6,
      DoctorName: "Dr. Marvin Campbell",
      Speciality: "Orthopaedics ",

      Date: "24 Jan 2019",
      time: "02.59 AM",
      image: doctor_thumb_05,
      AccountStatus: "checkbox",
    },
    {
      id: 7,
      DoctorName: "Dr. Olga Barlow",
      Speciality: "Dental ",
      Date: "15 Feb 2018",
      time: "03.59 AM",
      image: doctor_thumb_10,
      AccountStatus: "checkbox",
    },
    {
      id: 8,
      DoctorName: "Dr. Paul Richard",
      Speciality: "Dermatology ",
      Date: "11 Jan 2019",
      time: "02.59 AM",
      image: doctor_thumb_08,
      AccountStatus: "checkbox",
    },
    {
      id: 9,
      DoctorName: "Dr. Ruby Perrin",
      Speciality: "Dental ",
      Date: "14 Jan 2019",
      time: "02.59 AM",
      image: doctor_thumb_01,
      AccountStatus: "checkbox",
    },
    {
      id: 10,
      DoctorName: "Dr. Sofia Brient",
      Speciality: "Urology ",
      Date: "5 Jul 2019",
      time: "12.59 AM",
      image: doctor_thumb_04,
      AccountStatus: "checkbox",
    },
  ];
  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "DoctorName",
      render: (text: any, record: any) => (
        <>
          <Link className="avatar mx-2" to="/admin/profile">
            <img className="rounded-circle" src={record.image} />
          </Link>
          <Link to="/admin/profile">{text}</Link>
        </>
      ),
      sorter: (a: any, b: any) => a.DoctorName.length - b.DoctorName.length,
    },
    {
      title: "Speciality",
      dataIndex: "Speciality",
      sorter: (a: any, b: any) => a.Speciality.length - b.Speciality.length,
    },
    {
      title: "Member Since",
      render: (record: any) => (
        <>
          <span className="user-name">{record.Date}</span>
          <br />
          <span>{record.time}</span>
        </>
      ),
      sorter: (a: any, b: any) => a.length - b.length,
    },

    {
      title: "Account Status",
      dataIndex: "AccountStatus",
      render: (record: any) => {
        return (
          <div className="status-toggle">
            <input
              id={`rating${record?.id}`}
              className="check"
              type="checkbox"
              //  checked={false}
            />
            <label
              htmlFor={`rating${record?.id}`}
              className="checktoggle checkbox-bg"
            >
              checkbox
            </label>
          </div>
        );
      },
      sorter: (a: any, b: any) => a.AccountStatus.length - b.AccountStatus.length,
    },
  ];
  return (
    <>
      <Header />
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">List of Doctors</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">List of Doctors</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      pagination={{
                        total: data.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={data}
                      rowKey={(record) => record.id}
                      //  onChange={this.handleTableChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDoctors;
