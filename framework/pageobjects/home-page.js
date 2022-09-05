class HomePage {
  get macBookItem() {
    return $('//a[normalize-space()="MacBook"]');
  }

  get canonEosItem() {
    return $('//a[normalize-space()="Canon EOS 5D"]');
  }
}

module.exports = new HomePage();
