import React, { useState } from "react";
import "./App.css";
interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface ParamInputProps {
  param: Param;
  value: string;
  onChange: (paramId: number, value: string) => void;
}

const ParamInput: React.FC<ParamInputProps> = ({ param, value, onChange }) => {
  return (
    <div className="container">
      <label htmlFor={`param-${param.id}`}>{param.name}</label>
      <input
        id={`param-${param.id}`}
        type="text"
        value={value}
        onChange={(e) => onChange(param.id, e.target.value)}
      />
    </div>
  );
};

interface ModelEditorProps {
  params: Param[];
  initialModel: Model;
}

const ModelEditor: React.FC<ModelEditorProps> = ({ params, initialModel }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(
    initialModel.paramValues
  );

  const handleParamChange = (paramId: number, value: string) => {
    setParamValues((currentParamValues) =>
      currentParamValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
      )
    );
  };

  const getModel = (): Model => {
    return { paramValues };
  };

  return (
    <>
      {params.map((param) => {
        const paramValue =
          paramValues.find((pv) => pv.paramId === param.id)?.value || "";
        return (
          <ParamInput
            key={param.id}
            param={param}
            value={paramValue}
            onChange={handleParamChange}
          />
        );
      })}
      {/* Кнопка для вывода в консоль: */}
      <button
        onClick={() => {
          console.log(getModel());
        }}
      >
        Подтвердить
      </button>
    </>
  );
};

// Пример использования:
const paramsExample = [
  {
    id: 1,
    name: "Назначение",
  },
  {
    id: 2,
    name: "Длина",
  },
];

const modelExample = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "максимальная",
    },
  ],
};

const App: React.FC = () => {
  return (
    <div className="App">
      <ModelEditor params={paramsExample} initialModel={modelExample} />
    </div>
  );
};

export default App;
