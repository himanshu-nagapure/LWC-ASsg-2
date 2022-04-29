import { LightningElement, wire, api } from 'lwc';
import getAccounts from '@salesforce/apex/accountClass.getAccounts';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class TableDisplay extends LightningElement {
    @wire(getAccounts)
    accounts;

    @api isModalOpen = false;
    handleModal(event) {
        console.log("Delete Button CLicked");
        this.isModalOpen = true;
        // this.accName = event.currentTarget.dataset.name;
        // this.accId = event.currentTarget.dataset.id;
    }

    @api accIds = [];
    // btnVisible = false;
    getAccIds(e) {
        console.log("Watch Target ",e);
        if (e.target.checked) {
            this.accIds.push(e.target.name)
            // btnVisible = true;
            // const boxes = this.template.querySelectorAll('lightning-input');
            // boxes.forEach(box =>
            //     box.checked = e.target.name === box.name
            // );
            // this.dupaccid = this.accdata[e.target.value].Id
        }
        else{
            this.accIds.splice(this.accIds.indexOf(e.target.name), 1);
            // btnVisible = false;
        }
        console.log("Account Ids in making",this.accIds);
    }
    closeModal() {
        
        this.isModalOpen = false;
    }
    deleteAccount(event) {
       
        this.isModalOpen = false;
        console.log("Account Ids before delete",this.accIds);
        this.accIds.forEach(acc => {
            
            deleteRecord(acc)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted successfully',
                        variant: 'success'
                    })
                    
                );
                return refreshApex(acc);
                
            })
            .catch(error => {
                console.log(error);
                alert("Cannot delete this account"); 
            });
        });
        console.log("Account Ids after delete",this.accIds);

    }
}