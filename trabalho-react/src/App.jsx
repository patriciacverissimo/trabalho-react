import { useState } from "react";
import "./App.css";

const App = () => {
  //estado para armazenar a lista de tarefas
  const [tarefas, setTarefas] = useState([]);

  //estado para controlar o filtro
  const [filtro, setFiltro] = useState("todos");

  //estado para armazenar o valor atual do campo nova tarefa
  const [novaTarefa, setNovaTarefa] = useState("");

  //criar uma função para adicionar uma nova tarefa na lista
  const adicionarTarefa = () => {
    if (novaTarefa) {
      setTarefas([...tarefas, { nome: novaTarefa, concluida: false }]);
      setNovaTarefa(""); //limpar o campo de entrada de texto
    }
  };

  //alternar o status concluída de uma tarefa
  const toggleConcluida = (index) => {
    const novasTarefas = [...tarefas]; //clonou a lista
    novasTarefas[index].concluida = !novasTarefas[index].concluida; //inverteu o valor do que mexeu
    setTarefas(novasTarefas); //atualizar a lista
  };

  //filtrar as tarefas com base no filtro selecionado
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "concluidas") return tarefa.concluida;
    if (filtro === "pendentes") return !tarefa.concluida;
    return true;
  });

  return (
    <>
      <h1>Gerenciador de Tarefas</h1>
      <div className="conteudo">
        <div className="informacoes">
          {/*campo de entrada para uma nova tarefa e botão de adição */}
          <input
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
          />
          <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
        </div>

        {/*botões para filtro*/}
        <div className="botoes">
          <button onClick={() => setFiltro("todas")}>Todas</button>
          <button onClick={() => setFiltro("concluidas")}>Concluídas</button>
          <button onClick={() => setFiltro("pendentes")}>Pendentes</button>
        </div>
        {/*Lista de Tarefas*/}
        <ul>
          {tarefasFiltradas.map((tarefa, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => toggleConcluida(index)}
              />
              {tarefa.nome}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
