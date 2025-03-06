module.exports = {
  parser: "@typescript-eslint/parser", // Gunakan parser untuk TypeScript
  parserOptions: {
    ecmaVersion: 2020, // Versi ECMAScript yang digunakan
    sourceType: "module", // Gunakan modul ES6
    ecmaFeatures: {
      jsx: true, // Jika Anda menggunakan JSX (opsional)
    },
  },
  extends: [
    "plugin:vue/vue3-recommended", // Aturan Vue 3 yang direkomendasikan
    "eslint:recommended", // Aturan dasar ESLint yang direkomendasikan
    "plugin:@typescript-eslint/recommended", // Aturan dasar TypeScript yang direkomendasikan
  ],
  plugins: ["vue", "@typescript-eslint"], // Plugin yang digunakan
  rules: {
    // Anda bisa menambahkan atau menyesuaikan aturan di sini
    "@typescript-eslint/no-explicit-any": "warn", // Contoh aturan TypeScript
    "vue/no-unused-vars": "warn", // Contoh aturan Vue
    "no-console": "warn", // Contoh aturan untuk mencegah console.log di produksi
  },
};
