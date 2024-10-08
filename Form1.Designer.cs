namespace NCRApp
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.textBoxNCRNumber = new System.Windows.Forms.TextBox();
            this.dateTimePickerDate = new System.Windows.Forms.DateTimePicker();
            this.comboBoxDepartment = new System.Windows.Forms.ComboBox();
            this.textBoxIssueDescription = new System.Windows.Forms.TextBox();
            this.radioButtonLow = new System.Windows.Forms.RadioButton();
            this.radioButtonMedium = new System.Windows.Forms.RadioButton();
            this.radioButtonHigh = new System.Windows.Forms.RadioButton();
            this.textBoxResponsibilityAssignment = new System.Windows.Forms.TextBox();
            this.comboBoxStatusUpdates = new System.Windows.Forms.ComboBox();
            this.buttonSave = new System.Windows.Forms.Button();
            this.buttonCancel = new System.Windows.Forms.Button();
            this.listBoxSupportingDocuments = new System.Windows.Forms.ListBox();
            this.SuspendLayout();
            // 
            // textBoxNCRNumber
            // 
            this.textBoxNCRNumber.Location = new System.Drawing.Point(233, 10);
            this.textBoxNCRNumber.Margin = new System.Windows.Forms.Padding(2);
            this.textBoxNCRNumber.Name = "textBoxNCRNumber";
            this.textBoxNCRNumber.Size = new System.Drawing.Size(151, 20);
            this.textBoxNCRNumber.TabIndex = 0;
            // 
            // dateTimePickerDate
            // 
            this.dateTimePickerDate.Location = new System.Drawing.Point(233, 47);
            this.dateTimePickerDate.Margin = new System.Windows.Forms.Padding(2);
            this.dateTimePickerDate.Name = "dateTimePickerDate";
            this.dateTimePickerDate.Size = new System.Drawing.Size(151, 20);
            this.dateTimePickerDate.TabIndex = 1;
            // 
            // comboBoxDepartment
            // 
            this.comboBoxDepartment.FormattingEnabled = true;
            this.comboBoxDepartment.Items.AddRange(new object[] {
            "Manufacturing ",
            "Logistics",
            "Engineering"});
            this.comboBoxDepartment.Location = new System.Drawing.Point(233, 80);
            this.comboBoxDepartment.Margin = new System.Windows.Forms.Padding(2);
            this.comboBoxDepartment.Name = "comboBoxDepartment";
            this.comboBoxDepartment.Size = new System.Drawing.Size(151, 21);
            this.comboBoxDepartment.TabIndex = 2;
            // 
            // textBoxIssueDescription
            // 
            this.textBoxIssueDescription.Location = new System.Drawing.Point(233, 115);
            this.textBoxIssueDescription.Margin = new System.Windows.Forms.Padding(2);
            this.textBoxIssueDescription.Multiline = true;
            this.textBoxIssueDescription.Name = "textBoxIssueDescription";
            this.textBoxIssueDescription.Size = new System.Drawing.Size(151, 19);
            this.textBoxIssueDescription.TabIndex = 3;
            // 
            // radioButtonLow
            // 
            this.radioButtonLow.AutoSize = true;
            this.radioButtonLow.Location = new System.Drawing.Point(233, 154);
            this.radioButtonLow.Margin = new System.Windows.Forms.Padding(2);
            this.radioButtonLow.Name = "radioButtonLow";
            this.radioButtonLow.Size = new System.Drawing.Size(45, 17);
            this.radioButtonLow.TabIndex = 4;
            this.radioButtonLow.TabStop = true;
            this.radioButtonLow.Text = "Low";
            this.radioButtonLow.UseVisualStyleBackColor = true;
            // 
            // radioButtonMedium
            // 
            this.radioButtonMedium.AutoSize = true;
            this.radioButtonMedium.Location = new System.Drawing.Point(274, 154);
            this.radioButtonMedium.Margin = new System.Windows.Forms.Padding(2);
            this.radioButtonMedium.Name = "radioButtonMedium";
            this.radioButtonMedium.Size = new System.Drawing.Size(62, 17);
            this.radioButtonMedium.TabIndex = 5;
            this.radioButtonMedium.TabStop = true;
            this.radioButtonMedium.Text = "Medium";
            this.radioButtonMedium.UseVisualStyleBackColor = true;
            // 
            // radioButtonHigh
            // 
            this.radioButtonHigh.AutoSize = true;
            this.radioButtonHigh.Location = new System.Drawing.Point(332, 154);
            this.radioButtonHigh.Margin = new System.Windows.Forms.Padding(2);
            this.radioButtonHigh.Name = "radioButtonHigh";
            this.radioButtonHigh.Size = new System.Drawing.Size(47, 17);
            this.radioButtonHigh.TabIndex = 6;
            this.radioButtonHigh.TabStop = true;
            this.radioButtonHigh.Text = "High";
            this.radioButtonHigh.UseVisualStyleBackColor = true;
            // 
            // textBoxResponsibilityAssignment
            // 
            this.textBoxResponsibilityAssignment.Location = new System.Drawing.Point(233, 190);
            this.textBoxResponsibilityAssignment.Margin = new System.Windows.Forms.Padding(2);
            this.textBoxResponsibilityAssignment.Name = "textBoxResponsibilityAssignment";
            this.textBoxResponsibilityAssignment.Size = new System.Drawing.Size(151, 20);
            this.textBoxResponsibilityAssignment.TabIndex = 7;
            // 
            // comboBoxStatusUpdates
            // 
            this.comboBoxStatusUpdates.FormattingEnabled = true;
            this.comboBoxStatusUpdates.Location = new System.Drawing.Point(233, 236);
            this.comboBoxStatusUpdates.Margin = new System.Windows.Forms.Padding(2);
            this.comboBoxStatusUpdates.Name = "comboBoxStatusUpdates";
            this.comboBoxStatusUpdates.Size = new System.Drawing.Size(151, 21);
            this.comboBoxStatusUpdates.TabIndex = 8;
            // 
            // buttonSave
            // 
            this.buttonSave.Location = new System.Drawing.Point(283, 280);
            this.buttonSave.Margin = new System.Windows.Forms.Padding(2);
            this.buttonSave.Name = "buttonSave";
            this.buttonSave.Size = new System.Drawing.Size(56, 19);
            this.buttonSave.TabIndex = 9;
            this.buttonSave.Text = "Save";
            this.buttonSave.UseVisualStyleBackColor = true;
            this.buttonSave.Click += new System.EventHandler(this.btnSave_Click);
            // 
            // buttonCancel
            // 
            this.buttonCancel.Location = new System.Drawing.Point(283, 314);
            this.buttonCancel.Margin = new System.Windows.Forms.Padding(2);
            this.buttonCancel.Name = "buttonCancel";
            this.buttonCancel.Size = new System.Drawing.Size(56, 19);
            this.buttonCancel.TabIndex = 10;
            this.buttonCancel.Text = "Cancel";
            this.buttonCancel.UseVisualStyleBackColor = true;
            this.buttonCancel.Click += new System.EventHandler(this.btnCancel_Click);
            // 
            // listBoxSupportingDocuments
            // 
            this.listBoxSupportingDocuments.AccessibleName = "listBoxSupportingDocuments";
            this.listBoxSupportingDocuments.AccessibleRole = System.Windows.Forms.AccessibleRole.Cursor;
            this.listBoxSupportingDocuments.FormattingEnabled = true;
            this.listBoxSupportingDocuments.Location = new System.Drawing.Point(454, 177);
            this.listBoxSupportingDocuments.Margin = new System.Windows.Forms.Padding(2);
            this.listBoxSupportingDocuments.Name = "listBoxSupportingDocuments";
            this.listBoxSupportingDocuments.Size = new System.Drawing.Size(134, 108);
            this.listBoxSupportingDocuments.TabIndex = 11;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ActiveBorder;
            this.ClientSize = new System.Drawing.Size(661, 354);
            this.Controls.Add(this.listBoxSupportingDocuments);
            this.Controls.Add(this.buttonCancel);
            this.Controls.Add(this.buttonSave);
            this.Controls.Add(this.comboBoxStatusUpdates);
            this.Controls.Add(this.textBoxResponsibilityAssignment);
            this.Controls.Add(this.radioButtonHigh);
            this.Controls.Add(this.radioButtonMedium);
            this.Controls.Add(this.radioButtonLow);
            this.Controls.Add(this.textBoxIssueDescription);
            this.Controls.Add(this.comboBoxDepartment);
            this.Controls.Add(this.dateTimePickerDate);
            this.Controls.Add(this.textBoxNCRNumber);
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "Form1";
            this.Text = "NCR Form";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox textBoxNCRNumber;
        private System.Windows.Forms.DateTimePicker dateTimePickerDate;
        private System.Windows.Forms.ComboBox comboBoxDepartment;
        private System.Windows.Forms.TextBox textBoxIssueDescription;
        private System.Windows.Forms.RadioButton radioButtonLow;
        private System.Windows.Forms.RadioButton radioButtonMedium;
        private System.Windows.Forms.RadioButton radioButtonHigh;
        private System.Windows.Forms.TextBox textBoxResponsibilityAssignment;
        private System.Windows.Forms.ComboBox comboBoxStatusUpdates;
        private System.Windows.Forms.Button buttonSave;
        private System.Windows.Forms.Button buttonCancel;
        private System.Windows.Forms.ListBox listBoxSupportingDocuments;
    }
}
