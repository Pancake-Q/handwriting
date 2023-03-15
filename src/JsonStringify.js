function jsonStringify(data, replacer, space) {
  const placeholder = "____PLACEHOLDER____";

  // 处理replacer参数
  if (typeof replacer === "function") {
    data = (function walk(data, key) {
      const value = replacer(key, data);
      if (value === undefined) return;
      return value;
    })(data, "");
  } else if (Array.isArray(replacer)) {
    const replaceKeys = replacer.map((key) => {
      return typeof key === "string" ? key : undefined;
    });
    data = (function walk(data, key) {
      if (typeof key === "string" && replaceKeys.indexOf(key) === -1) {
        return undefined;
      }
      const value = replacer.length === 0 ? data : replacer[key];
      if (value === undefined) return;
      return value;
    })(data, "");
  }

  // 处理space参数
  const separator = space ? "\n" : "";
  const indent = space ? " ".repeat(space) : "";

  // 处理data
  const seen = [];
  return (function serialize(data, path) {
    const type = typeof data;

    // 处理null和undefined
    if (data === null) return "null";
    if (data === undefined) return;

    // 处理基本类型
    if (type === "number" || type === "boolean") {
      return String(data);
    }
    if (type === "string") {
      return '"' + data + '"';
    }

    // 处理数组
    if (Array.isArray(data)) {
      if (seen.indexOf(data) !== -1) {
        throw new TypeError("Converting circular structure to JSON");
      }
      if (data.length === 0) return "[]";
      seen.push(data);
      const partial = data.map((item, index) => {
        const serializedItem = serialize(item, `${path}[${index}]`);
        return serializedItem === undefined ? "null" : serializedItem;
      });
      seen.pop();
      return `[${separator}${indent}${partial.join(
        `,${separator}${indent}`
      )}${separator}]`;
    }

    // 处理对象
    if (type === "object") {
      if (seen.indexOf(data) !== -1) {
        throw new TypeError("Converting circular structure to JSON");
      }
      seen.push(data);
      const partial = [];
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const serializedValue = serialize(data[key], `${path}.${key}`);
          if (serializedValue !== undefined) {
            partial.push(`"${key}":${separator}${indent}${serializedValue}`);
          }
        }
      }
      seen.pop();
      return `{${separator}${indent}${partial.join(
        `,${separator}${indent}`
      )}${separator}}`;
    }

    // 处理函数和Symbol类型
    return placeholder;
  })(data, "");
}

const data = {
  name: "Alice",
  age: 20,
  skills: ["JavaScript", "HTML", "CSS"],
  address: {
    city: "Shanghai",
    district: "Pudong",
  },
};

const replacer = ["name", "skills"];
const space = 2;

const result = jsonStringify(data, replacer, space);
console.log(result);
