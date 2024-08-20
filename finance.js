const date = document.getElementById('date');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const category = document.getElementById('category');
const container = document.getElementById('expensesContainer');
const addBtn = document.getElementById('addBtn');
const totalAmountElement = document.getElementById('totalAmount');

container.style.display = 'none';

let totalAmount = 0.00;

const updateTotalAmount = (value) => {
    totalAmount += value;
    totalAmountElement.textContent = totalAmount.toFixed(2);
}

const addExpenses = () => {
    const div = document.createElement('div');

    const dateInfo = document.createElement('p');
    dateInfo.textContent = date.value;

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = description.value;

    

    const amountInfo = document.createElement('p');
    amountInfo.textContent = `$${amount.value}`;  
    const amountValue = parseFloat(amount.value);
    if (isNaN(amountValue) || amount.value.trim() === '') {
        alert('Please enter a valid amount.');
        return; 
    }
    updateTotalAmount(amountValue);

    const categoryInfo = document.createElement('p');
    categoryInfo.textContent = category.value;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        const newDateInput = document.createElement('input');
        newDateInput.id = 'newDateInput';
        newDateInput.type = 'date';
        newDateInput.placeholder = 'Date';
        newDateInput.value = dateInfo.textContent;
        dateInfo.replaceWith(newDateInput);
        
        const newDescriptionInput = document.createElement('input');
        newDescriptionInput.id = 'newDescriptionInput';
        newDescriptionInput.type = 'text';
        newDescriptionInput.placeholder = 'Description';
        newDescriptionInput.value = descriptionInfo.textContent;
        descriptionInfo.replaceWith(newDescriptionInput);

        const newAmountInput = document.createElement('input');
        newAmountInput.id = 'newAmountInfo';
        newAmountInput.type = 'number';
        newAmountInput.placeholder = 'Amount';
        newAmountInput.value = amountInfo.textContent;
        const oldAmountValue = parseFloat(amountInfo.textContent);
        newAmountInput.addEventListener('input', () => {
            const newAmountValue = parseFloat(newAmountInput.value);
            updateTotalAmount(newAmountValue - oldAmountValue);
        });
        amountInfo.replaceWith(newAmountInput);

        const newCategoryInput = document.createElement('select');
        newCategoryInput.id = 'newAmountInfo';
        const newCategories = ['Bills', 'Transportation', 'Entertainment', 'Groceries', 'Health'];
        newCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            newCategoryInput.appendChild(option);
        })
        newCategoryInput.value = categoryInfo.textContent;
        categoryInfo.replaceWith(newCategoryInput);

        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update';
        editBtn.replaceWith(updateBtn);
        deleteBtn.remove();
        updateBtn.id = 'updateBtn';
        updateBtn.addEventListener('click', () => {
            dateInfo.textContent = newDateInput.value;
            newDateInput.replaceWith(dateInfo);

            descriptionInfo.textContent = newDescriptionInput.value;
            newDescriptionInput.replaceWith(descriptionInfo);

            amountInfo.textContent = newAmountInput.value;
            newAmountInput.replaceWith(amountInfo);

            categoryInfo.textContent = newCategoryInput.value;
            newCategoryInput.replaceWith(categoryInfo);

            updateBtn.replaceWith(editBtn)
            div.appendChild(deleteBtn)
        })
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        const amountValue = parseFloat(amountInfo.textContent);
        updateTotalAmount(-amountValue);
        div.remove();
    });

    div.append(dateInfo, descriptionInfo, amountInfo, categoryInfo, editBtn, deleteBtn);

    container.appendChild(div);
}

addBtn.addEventListener('click', () => {
    addExpenses();

    container.style.display = 'block';

    date.value = '';
    description.value = '';
    amount.value = '';
    category.value = '';
});
