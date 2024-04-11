
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('theme', [{
      theme: 'light',
      description: 'Светлая тема'
    }, {
      theme: 'dark',
      description: 'Темная тема'
    }]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('theme', null, {});
  }
};
