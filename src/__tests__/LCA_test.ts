import { LCA } from "../LCA";
import { TreeNode } from "../LCA";

describe("find path", () => {

  /* 
                                1
                               / \
                              2   3
                             / \ / \
                            4  5 6  7
  */
  let valid_tree: TreeNode = new TreeNode(1);
  valid_tree.left = new TreeNode(2);
  valid_tree.right = new TreeNode(3);
  valid_tree.left.left = new TreeNode(4);
  valid_tree.left.right = new TreeNode(5);
  valid_tree.right.left = new TreeNode(6);
  valid_tree.right.right = new TreeNode(7);

  let only_root_tree: TreeNode = new TreeNode(1);

  let null_tree: TreeNode = null;
  it.each`
    tree_type         | node_id | expected | expected_path | test_name
    ${valid_tree}     | ${1}    | ${true}  | ${[1]}        | ${"root"}
    ${valid_tree}     | ${10}   | ${false} | ${[]}         | ${"not existent"}
    ${valid_tree}     | ${6}    | ${true}  | ${[1, 3, 6]}  | ${"right subtree - 1"}
    ${valid_tree}     | ${7}    | ${true}  | ${[1, 3, 7]}  | ${"right subtree - 2"}
    ${valid_tree}     | ${4}    | ${true}  | ${[1, 2, 4]}  | ${"left  subtree"}
    ${only_root_tree} | ${1}    | ${true}  | ${[1]}        | ${"only_root - root"}
    ${only_root_tree} | ${2}    | ${false} | ${[]}         | ${"only_root - non existent"}
    ${null_tree}      | ${99}   | ${false} | ${[]}         | ${"null tree"}
  `(
    "should find a correct path: $test_name",
    ({ tree_type, node_id, expected, expected_path }) => {
      let path: number[] = [];
      expect(LCA.find_path(tree_type, node_id, path)).toBe(expected);
      expect(path).toStrictEqual(expected_path);
    }
  );
});

describe("find LCA", () => {
  let valid_tree: TreeNode = new TreeNode(1);
  valid_tree.left = new TreeNode(2);
  valid_tree.right = new TreeNode(3);
  valid_tree.left.left = new TreeNode(4);
  valid_tree.left.right = new TreeNode(5);
  valid_tree.right.left = new TreeNode(6);
  valid_tree.right.right = new TreeNode(7);

  let only_root_tree: TreeNode = new TreeNode(1);

  let null_tree: TreeNode = null;

  it.each`
    tree_type         | node_one | node_two | expected | test_name
    ${valid_tree}     | ${1}     | ${1}     | ${1}     | ${"root with root"}
    ${valid_tree}     | ${10}    | ${1}     | ${-1}    | ${"root with non-existent node"}
    ${valid_tree}     | ${6}     | ${7}     | ${3}     | ${"right subtree"}
    ${valid_tree}     | ${4}     | ${5}     | ${2}     | ${"left subtree"}
    ${valid_tree}     | ${4}     | ${4}     | ${4}     | ${"node with itself"}
    ${only_root_tree} | ${1}     | ${1}     | ${1}     | ${"only_root - root with root"}
    ${only_root_tree} | ${1}     | ${10}    | ${-1}    | ${"only_root - root with non-existent"}
    ${only_root_tree} | ${11}    | ${10}    | ${-1}    | ${"only_root - non-existent, non-existent"}
    ${null_tree}      | ${99}    | ${100}   | ${-1}    | ${"null_tree - non-existent, non-existent"}
    ${null_tree}      | ${1}     | ${1}     | ${-1}    | ${"null_tree - same node"}
  `(
    "should find a correct LCA $test_name",
    ({ tree_type, node_one, node_two, expected }) => {
      let path: number[] = [];
      expect(LCA.find_LCA(tree_type, node_one, node_two)).toBe(expected);
    }
  );
});
