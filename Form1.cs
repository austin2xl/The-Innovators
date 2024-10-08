using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Windows.Forms;

namespace NCRApp
{
    public partial class Form1 : Form
    {
        private const string Manufacturing = "Manufacturing";
        private const string Logistics = "Logistics";
        private const string Engineering = "Engineering";
        private const string New = "New";
        private const string InProgress = "In Progress";
        private const string Completed = "Completed";
        private const string Rejected = "Rejected";

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            comboBoxDepartment.Items.AddRange(new[] { Manufacturing, Logistics, Engineering });
            comboBoxStatusUpdates.Items.AddRange(new[] { New, InProgress, Completed, Rejected });
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            try
            {
                if (!IsValidInput())
                {
                    return;
                }

                var ncr = GetNCRDetails();
                SaveNCR(ncr);
                ClearForm();
            }
            catch (Exception ex)
            {
                MessageBox.Show("An error occurred while saving the NCR: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private bool IsValidInput()
        {
            if (string.IsNullOrEmpty(textBoxNCRNumber.Text) || string.IsNullOrWhiteSpace(textBoxIssueDescription.Text))
            {
                MessageBox.Show("Please fill in all the required fields.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }

            if (comboBoxDepartment.SelectedItem == null)
            {
                MessageBox.Show("Please select a department.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }

            if (string.IsNullOrWhiteSpace(textBoxIssueDescription.Text))
            {
                MessageBox.Show("Issue description cannot be empty.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }

            if (!radioButtonLow.Checked && !radioButtonMedium.Checked && !radioButtonHigh.Checked)
            {
                MessageBox.Show("Please select a severity level.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }

            if (string.IsNullOrEmpty(textBoxResponsibilityAssignment.Text))
            {
                MessageBox.Show("Please enter a responsibility assignment.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }

            return true;
        }

        private NCR GetNCRDetails()
        {
            return new NCR
            {
                NCRNumber = textBoxNCRNumber.Text,
                Date = dateTimePickerDate.Value.ToString("YYYY-MM-DD"),
                Department = comboBoxDepartment.SelectedItem?.ToString(),
                IssueDescription = textBoxIssueDescription.Text,
                Severity = GetSelectedSeverity(),
                SupportingDocuments = listBoxSupportingDocuments.SelectedItem?.ToString() ?? "None",
                ResponsibilityAssignment = textBoxResponsibilityAssignment.Text,
                StatusUpdates = comboBoxStatusUpdates.SelectedItem?.ToString() ?? "Pending"
            };
        }

        private string GetSelectedSeverity()
        {
            if (radioButtonLow.Checked)
                return "Low";
            else if (radioButtonMedium.Checked)
                return "Medium";
            else
                return "High";
        }

        private void SaveNCR(NCR ncr)
        {
            // Implement NCR saving logic here

            MessageBox.Show($"NCR Saved!\n\nNCR Number: {ncr.NCRNumber}\nDate: {ncr.Date}\nDepartment: {ncr.Department}\nIssue: {ncr.IssueDescription}\nSeverity: {ncr.Severity}\nDocuments: {ncr.SupportingDocuments}\nResponsible: {ncr.ResponsibilityAssignment}\nStatus: {ncr.StatusUpdates}",
                "NCR Report", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private void ClearForm()
        {
            textBoxNCRNumber.Clear();
            dateTimePickerDate.Value = DateTime.Now;
            comboBoxDepartment.SelectedIndex = -1;
            textBoxIssueDescription.Clear();
            textBoxResponsibilityAssignment.Text = "";
            radioButtonLow.Checked = true;
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            ClearForm();
        }
    }

    public class NCR
    {
        public string NCRNumber { get; set; }
        public string Date { get; set; }
        public string Department { get; set; }
        public string IssueDescription { get; set; }
        public string Severity { get; set; }
        public string SupportingDocuments { get; set; }
        public string ResponsibilityAssignment { get; set; }
        public string StatusUpdates { get; set; }
    }
}
