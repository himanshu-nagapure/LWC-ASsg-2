public with sharing class accountClass {
    public accountClass() {

    }
    @AuraEnabled(cacheable = true)
    public static list<account> getAccounts(){        
        return[select Id,Name,Phone,AnnualRevenue from Account limit 10];      
    }
}
