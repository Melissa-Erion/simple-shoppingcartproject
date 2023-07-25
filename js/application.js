$(document).ready(function() {
    $(document).on('click', '#add-item-btn', function() {
      addCartItem();
    });
  
    $(document).on('click', '.btn-add-cart-item', function() {
      addToCartList($(this).closest('tr'));
      updateGrandTotal();
    });
  
    $(document).on('click', '.remove', function() {
      const index = $(this).closest('tr').index();
      removeCartItem(index);
      updateGrandTotal();
    });
  });
  
  function addCartItem() {
    const newRow = $('#cart-list tbody tr:last').clone();
    newRow.find('.cart-quantity').val(0);
    newRow.find('.cart-item').val('');
    newRow.find('.cart-price').val('');
    newRow.find('.item-subtotal').text('$0.00');
    $('#cart-list tbody').append(newRow);
  }
  
  function addToCartList(row) {
    const item = row.find('.cart-item').val();
    const quantity = row.find('.cart-quantity').val();
    const price = row.find('.cart-price').val();
    const listItem = `
      <tr>
        <td>${item}</td>
        <td>${quantity}</td>
        <td>${price}</td>
        <td class="item-total">$${calculateTotal(quantity, price)}</td>
        <td><button class="btn btn-sm remove">Remove</button></td>
      </tr>
    `;
    $('#cart-list tbody').append(listItem);
  }
  
  function calculateTotal(quantity, price) {
    const numericQuantity = parseFloat(quantity);
    const numericPrice = parseFloat(price);
  
    if (!isNaN(numericPrice)) {
      const total = numericQuantity * numericPrice;
      return total.toFixed(2);
    } else {
      return '0.00';
    }
  }
  
  function updateGrandTotal() {
    let grandTotal = 0;
    $('.item-total').each(function() {
      const itemTotal = parseFloat($(this).text().replace('$', ''));
      if (!isNaN(itemTotal)) {
        grandTotal += itemTotal;
      }
    });
    $('#grand-total').text(`$${grandTotal.toFixed(2)}`);
  }
  
  function removeCartItem(index) {
    $('#cart-list tbody tr').eq(index).remove();
  }