



using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ERP.Class.BAL;
using SQLDB;
using System.Data;
using System.Collections;
using System.IO;
using CrystalDecisions.Shared;
using ERP.Report;
using CrystalDecisions.CrystalReports.Engine;
using System.Net;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Configuration;
using System.Data.SqlClient;

using Newtonsoft.Json;


namespace ERP.Web.Pages
{
    public partial class HRdashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //DataTable dataTable = DB.GetDataTable("SELECT COUNT(*) AS TotalEntries FROM TBL_USER;");
            //this.head_count_total.Text = dataTable.Rows[0][0].ToString();
            this.Cbindregion();
           // this.the_campus.Text = 0.ToString();
            //this.ddl_CRegion.SelectedValue = 0.ToString();
            // this.the_campus.Text="dd";
            // string for_fixed_school=this.ddl_category.SelectedValue = 2.ToString(); ;

            //this.CbindBFC();
            //this.ddlCatFee();

            //ScriptManager.RegisterStartupScript(this, GetType(), "PopulateRegionDropdown", "populateRegionDropdown();", true);





            //dataView.Sort = "DID ASC";
            //this.head_count_total.Text = dataTable.Rows[0][0].ToString();

            if (this.Session["ROLES"].ToString() != "1" && this.Session["ROLES"].ToString() != "14")
            {
                if (this.Session["IsAdmin"].ToString() == "True")
                {
                    //this.ddl_campus.SelectedIndex = this.ddl_campus.Items.IndexOf(this.ddl_campus.Items.FindByValue(this.Session["SID"].ToString()));
                    //this.ddl_campus.Enabled = true;

                    this.ddl_CRegion.SelectedIndex = this.ddl_CRegion.Items.IndexOf(this.ddl_CRegion.Items.FindByValue(this.Session["RID"].ToString()));
                    this.ddl_CRegion.Enabled = false;
                    this.the_campus.Text = 0.ToString();
                }
                else
                {
                    this.ddl_CRegion.SelectedIndex = this.ddl_CRegion.Items.IndexOf(this.ddl_CRegion.Items.FindByValue(this.Session["RID"].ToString()));
                    this.ddl_CRegion.Enabled = false;
                    //this.ddl_CRegion.SelectedIndex = this.ddl_campus.Items.IndexOf(this.ddl_campus.Items.FindByValue(this.Session["SID"].ToString()));
                    //this.ddl_campus.Enabled = false;
                    this.the_campus.Text = this.Session["SID"].ToString();
                }
            }
            else
            {
                this.the_campus.Text = 0.ToString();
                this.ddl_CRegion.SelectedValue = 0.ToString();
            }




        }
        [WebMethod]
        public static string Executing_SP()
        {
            SortedList sl = new SortedList();
            sl.Add("@Region", 0);
            sl.Add("@BFC", 0);

            sl.Add("@Selyear", 2023);
            sl.Add("@SelMonth", 5);

            DataTable dataTableByStoredProcedure = DB.GetDataTableByStoredProcedure("HR_Dashboard", sl);


            // Assuming dt is your DataTable

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            // Serialize the DataTable to JSON
            try
            {
                // Serialize the DataTable to JSON
                string json = JsonConvert.SerializeObject(dataTableByStoredProcedure);
                return json;
            }
            catch (Exception ex)
            {
                // Log or display the error message
                Console.WriteLine("An error occurred during serialization: " + ex.Message);
                return string.Empty; // or return an error message
            }

        }


        public void Cbindregion()
        {
            DataTable dataTable = DB.GetDataTable("select RID , Region from tbl_Region ");
            DataRow allOption = dataTable.NewRow();
            allOption["RID"] = 0;
            allOption["Region"] = "All";

            // Insert the "all" option at the beginning of the DataTable
            dataTable.Rows.InsertAt(allOption, 0);
            this.ddl_CRegion.DataSource = dataTable;

            this.ddl_CRegion.DataTextField = "Region";
            this.ddl_CRegion.DataValueField = "RID";
            this.ddl_CRegion.DataBind();

        }


        //  public class RegionItem
        //  {
        //      public string RID { get; set; }
        //      public string Region { get; set; }
        //      public string ThirdValue { get; set; }
        //  }
        //cccccc

        //public void CbindDesignation()
        //{
        //    DataTable dataTable = DB.GetDataTable("select DID , DESIGNATION from tbl_designation ");
        //    this.ddl_Designation.DataSource = dataTable;

        //    this.ddl_Designation.DataTextField = "DESIGNATION";
        //    this.ddl_Designation.DataValueField = "DID";
        //    this.ddl_Designation.DataBind();

        //}
        //protected void ddl_CRegion_SelectedIndexChanged(object sender, EventArgs e)
        //{
        //    CbindBFC();
        //}
        public class BFCItem
        {
            public string BID { get; set; }
            public string BFCName { get; set; }
            //public string ThirdValue { get; set; }
        }
        [WebMethod]
        public static List<BFCItem> GetBFCData(int RegionID, int is_school)
        {
            //DataTable dataTable = DB.GetDataTable("select distinct BID,Collage_NAME from TBL_Collage  where ACTIVE='Y' and cisdelete='N' and regionid=" + RegionID + "order by COLLAGE_NAME");
            //DataRow allOption = dataTable.NewRow();

            //allOption["BID"] = 0;
            //allOption["Collage_name"] = "All";
            //dataTable.Rows.InsertAt(allOption, 0);

            ////this.ddl_category.DataSource = dataTable;
            //string json = JsonConvert.SerializeObject(dataTable);
            //return json;
            String query;
          query = "select distinct BID,Collage_NAME from TBL_Collage  where ACTIVE='Y' and cisdelete='N' and regionid=" + RegionID + "order by COLLAGE_NAME";


           // }

            string constr = ConfigurationManager.ConnectionStrings["CONN_ERP"].ConnectionString;

            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = con;
                    con.Open();

                    List<BFCItem> customers = new List<BFCItem>();
                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            if (is_school != 0 && sdr["BID"].ToString() == is_school.ToString())
                            {
                                BFCItem regionItem = new BFCItem
                                {
                                    BID = sdr["BID"].ToString(),
                                    BFCName = sdr["Collage_NAME"].ToString(),
                                    //ThirdValue = sdr["RegionCode"].ToString()
                                };
                                customers.Add(regionItem);
                                break;
                            }
                            else if (is_school == 0)
                            {

                                BFCItem regionItem = new BFCItem
                                {
                                    BID = sdr["BID"].ToString(),
                                    BFCName = sdr["Collage_NAME"].ToString(),
                                    //ThirdValue = sdr["RegionCode"].ToString()
                                };
                                customers.Add(regionItem);
                            }

                        }
                    }

                    con.Close();
                    return customers;
                }
            }


        }


        //public void CbindBFC()
        //{
        //    if (this.Session["ROLES"].ToString() != "1" && this.Session["ROLES"].ToString() != "14" )
        //    {
        //        this.ddl_category.DataSource = DB.GetDataTable("select distinct BID,Collage_NAME from TBL_Collage C INNER JOIN TBL_REGION_COLLEGE RG ON RG.REGIONID=C.REGIONID where ACTIVE='Y' and cisdelete='N' and C.regionid=" + this.Session["RID"] + "order by C.COLLAGE_NAME");
        //        this.ddl_category.DataTextField = "Collage_NAME";
        //        this.ddl_category.DataValueField = "BID";
        //        this.ddl_category.DataBind();
        //        this.ddl_category.Items.Insert(0, new ListItem("All", "0"));
        //    }
        //    else
        //    {
        //        this.ddl_category.DataSource = DB.GetDataTable("select distinct BID,Collage_NAME from TBL_Collage  where ACTIVE='Y' and cisdelete='N' and regionid=" + this.ddl_CRegion.SelectedValue + "order by COLLAGE_NAME");
        //        this.ddl_category.DataTextField = "Collage_NAME";
        //        this.ddl_category.DataValueField = "BID";
        //        this.ddl_category.DataBind();
        //        this.ddl_category.Items.Insert(0, new ListItem("All", "0"));
        //    }
        //}


    }
}
